import { GoogleGenAI } from "@google/genai";
import { PBP_CUSTOMER_SUPPORT_KNOWLEDGE } from "./customerSupportKnowledge";

export interface ApiResult {
  status: number;
  body: Record<string, unknown>;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const reverseGeocodeCache = new Map<string, { name: string; expiresAt: number }>();
const weatherCache = new Map<string, { data: Record<string, unknown>; expiresAt: number }>();
let nominatimQueue = Promise.resolve();
let lastNominatimRequestAt = 0;

export async function getPortWeather(
  latitudeValue: unknown,
  longitudeValue: unknown,
  languageValue: unknown,
): Promise<ApiResult> {
  const latitude = typeof latitudeValue === "string" ? Number(latitudeValue) : NaN;
  const longitude = typeof longitudeValue === "string" ? Number(longitudeValue) : NaN;
  const language = languageValue === "EN" ? "EN" : "ID";

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return { status: 400, body: { error: "Provide valid latitude and longitude coordinates." } };
  }

  const cacheKey = `${latitude.toFixed(3)},${longitude.toFixed(3)}`;
  const cachedWeather = weatherCache.get(cacheKey);
  if (cachedWeather && cachedWeather.expiresAt > Date.now()) {
    return { status: 200, body: cachedWeather.data };
  }
  if (cachedWeather) weatherCache.delete(cacheKey);

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set("current", [
    "temperature_2m",
    "relative_humidity_2m",
    "apparent_temperature",
    "is_day",
    "precipitation",
    "weather_code",
    "wind_speed_10m",
    "wind_direction_10m",
  ].join(","));
  url.searchParams.set("timezone", "auto");

  try {
    const response = await fetch(url, {
      headers: { "Accept": "application/json" },
    });
    if (!response.ok) {
      console.error("Open-Meteo weather request failed:", response.status);
      return { status: 502, body: { error: "Weather data is temporarily unavailable." } };
    }

    const result: unknown = await response.json();
    if (
      typeof result !== "object" ||
      result === null ||
      !("current" in result) ||
      typeof result.current !== "object" ||
      result.current === null
    ) {
      console.error("Open-Meteo weather returned an invalid response.");
      return { status: 502, body: { error: "The weather service returned an invalid response." } };
    }

    const weatherData = {
      ...result.current as Record<string, unknown>,
      timezone: "timezone" in result && typeof result.timezone === "string" ? result.timezone : "",
      language,
    };

    if (weatherCache.size >= 100) {
      const oldestCacheKey = weatherCache.keys().next().value;
      if (oldestCacheKey) weatherCache.delete(oldestCacheKey);
    }
    weatherCache.set(cacheKey, { data: weatherData, expiresAt: Date.now() + 10 * 60 * 1000 });
    return { status: 200, body: weatherData };
  } catch (error) {
    console.error("Open-Meteo weather request failed:", error);
    return { status: 502, body: { error: "Weather data is temporarily unavailable." } };
  }
}

export async function getLocationName(
  latitudeValue: unknown,
  longitudeValue: unknown,
  languageValue: unknown,
): Promise<ApiResult> {
  const latitude = typeof latitudeValue === "string" ? Number(latitudeValue) : NaN;
  const longitude = typeof longitudeValue === "string" ? Number(longitudeValue) : NaN;
  const language = languageValue === "EN" ? "en" : "id";

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return { status: 400, body: { error: "Provide valid latitude and longitude coordinates." } };
  }

  const cacheKey = `${latitude.toFixed(4)},${longitude.toFixed(4)},${language}`;
  const cachedLocation = reverseGeocodeCache.get(cacheKey);
  if (cachedLocation && cachedLocation.expiresAt > Date.now()) {
    return { status: 200, body: { name: cachedLocation.name } };
  }
  if (cachedLocation) reverseGeocodeCache.delete(cacheKey);

  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("lat", String(latitude));
  url.searchParams.set("lon", String(longitude));
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("accept-language", language);

  const request = nominatimQueue.then(async () => {
    const delay = Math.max(0, 1000 - (Date.now() - lastNominatimRequestAt));
    if (delay > 0) await new Promise(resolve => setTimeout(resolve, delay));
    lastNominatimRequestAt = Date.now();
    return fetch(url, {
      headers: {
        "User-Agent": "PT Perintis Bermuda Perkasa Website/1.0 (sales@perintisbermudaperkasa.com)",
        "Accept": "application/json",
      },
    });
  });
  nominatimQueue = request.then(() => undefined, () => undefined);

  try {
    const response = await request;
    if (!response.ok) {
      console.error("OpenStreetMap reverse geocoding failed:", response.status);
      return {
        status: 502,
        body: { error: "Unable to look up a place name right now. Please try again later." },
      };
    }

    const result: unknown = await response.json();
    if (typeof result !== "object" || result === null) {
      console.error("OpenStreetMap reverse geocoding returned an invalid response.");
      return { status: 502, body: { error: "The place-name service returned an invalid response." } };
    }

    const address = "address" in result && typeof result.address === "object" && result.address !== null
      ? result.address as Record<string, unknown>
      : {};
    const getAddressPart = (...keys: string[]) => {
      for (const key of keys) {
        const value = address[key];
        if (typeof value === "string" && value.trim()) return value.trim();
      }
      return undefined;
    };

    const village = getAddressPart("village", "suburb");
    const district = getAddressPart("city_district", "district", "municipality");
    const regencyOrCity = getAddressPart("county", "city", "town", "state_district");
    const province = getAddressPart("state", "region");
    const country = getAddressPart("country");
    const displayName = "display_name" in result && typeof result.display_name === "string"
      ? result.display_name
      : undefined;
    const name = [village, district, regencyOrCity, province, country]
      .filter((part, index, parts): part is string => Boolean(part) && parts.indexOf(part) === index)
      .join(", ") || displayName?.split(",").slice(0, 3).join(", ").trim();

    if (!name) {
      return { status: 404, body: { error: "No place name is available for this location." } };
    }

    if (reverseGeocodeCache.size >= 500) {
      const oldestCacheKey = reverseGeocodeCache.keys().next().value;
      if (oldestCacheKey) reverseGeocodeCache.delete(oldestCacheKey);
    }
    reverseGeocodeCache.set(cacheKey, { name, expiresAt: Date.now() + 24 * 60 * 60 * 1000 });
    return { status: 200, body: { name } };
  } catch (error) {
    console.error("OpenStreetMap reverse geocoding request failed:", error);
    return {
      status: 502,
      body: { error: "Unable to look up a place name right now. Please try again later." },
    };
  }
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null || !("role" in value) || !("content" in value)) {
    return false;
  }

  return (
    (value.role === "user" || value.role === "assistant") &&
    typeof value.content === "string" &&
    Boolean(value.content.trim()) &&
    value.content.length <= 2000
  );
}

export async function postChat(body: unknown): Promise<ApiResult> {
  try {
    const messages = typeof body === "object" && body !== null && "messages" in body
      ? body.messages
      : undefined;

    if (
      !Array.isArray(messages) ||
      messages.length === 0 ||
      messages.length > 20 ||
      !messages.every(isChatMessage)
    ) {
      return {
        status: 400,
        body: { error: "Provide 1 to 20 valid chat messages, each up to 2,000 characters." },
      };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        status: 503,
        body: {
          code: "CHAT_NOT_CONFIGURED",
          error: "Chat replies are temporarily unavailable. Please contact our team directly.",
        },
      };
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const systemInstruction = `Anda adalah asisten virtual layanan pelanggan PT Perintis Bermuda Perkasa (PBP). ${PBP_CUSTOMER_SUPPORT_KNOWLEDGE}

Balas dalam bahasa yang digunakan pengunjung (Bahasa Indonesia atau Inggris). Jawab dengan ringkas, ramah, dan profesional. Jangan mengaku sebagai manusia; jika ditanya, jelaskan bahwa Anda asisten virtual PBP.`;
    const formattedContents = messages.map(message => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    }));
    const modelsToTry = ["gemini-3.6-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite"];
    const fallbackText = "Mohon maaf, saya belum bisa memproses pesan Anda saat ini. Silakan coba lagi nanti.";
    let responseText = fallbackText;
    let receivedResponse = false;
    let lastError: unknown;

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: 0.4,
          },
        });
        responseText = response.text || fallbackText;
        receivedResponse = true;
        break;
      } catch (error) {
        lastError = error;
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    if (!receivedResponse) {
      console.error(
        "All Gemini models exhausted. Final error:",
        lastError instanceof Error ? lastError.message : lastError ?? "No response",
      );
      throw lastError instanceof Error
        ? lastError
        : new Error("All available Gemini models are currently experiencing high demand.");
    }

    return { status: 200, body: { text: responseText } };
  } catch (error) {
    console.error("Gemini API Error in /api/chat:", error);
    return {
      status: 500,
      body: { error: "Chat replies are temporarily unavailable. Please try again later." },
    };
  }
}
