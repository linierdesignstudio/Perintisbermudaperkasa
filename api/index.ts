import { getLocationName, postChat, type ApiResult } from "../apiHandlers";

function jsonResponse(result: ApiResult, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
  });
}

function methodNotAllowed(allow: string): Response {
  return jsonResponse({
    status: 405,
    body: { error: "Method not allowed." },
  }, { Allow: allow });
}

function badRequest(): Response {
  return jsonResponse({ status: 400, body: { error: "Request body must be valid JSON." } });
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const route = url.searchParams.get("route") ?? "";

    if (route === "health" && request.method === "GET") {
      return jsonResponse({ status: 200, body: { status: "ok" } });
    }

    if (route === "location-name" && request.method === "GET") {
      const result = await getLocationName(
        url.searchParams.get("lat"),
        url.searchParams.get("lon"),
        url.searchParams.get("lang"),
      );
      return jsonResponse(result);
    }

    if (route === "chat" && request.method === "POST") {
      let body: unknown;
      try {
        body = await request.json();
      } catch {
        return badRequest();
      }
      return jsonResponse(await postChat(body));
    }

    if (route === "health") return methodNotAllowed("GET");
    if (route === "location-name") return methodNotAllowed("GET");
    if (route === "chat") return methodNotAllowed("POST");
    return jsonResponse({ status: 404, body: { error: "API route not found." } });
  },
};
