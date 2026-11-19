import express from "express";
import path from "path";
import { getLocationName, getPortWeather, postChat } from "./apiHandlers";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/location-name", async (req, res) => {
    const result = await getLocationName(req.query.lat, req.query.lon, req.query.lang);
    res.status(result.status).json(result.body);
  });

  app.get("/api/port-weather", async (req, res) => {
    const result = await getPortWeather(req.query.lat, req.query.lon, req.query.lang);
    res.status(result.status).json(result.body);
  });

  app.post("/api/chat", async (req, res) => {
    const result = await postChat(req.body);
    res.status(result.status).json(result.body);
  });

  const isProduction = process.env.NODE_ENV === "production" || process.argv.includes("--production");
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("/{*splat}", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
