# PT Perintis Bermuda Perkasa

Website React/Vite dengan API untuk chatbot Gemini dan pencarian nama lokasi. Aplikasi dapat dijalankan sebagai Node.js service atau container Docker. Adapter Vercel tersedia untuk deployment serverless.

## Persyaratan

Node.js 22 atau 24 dan npm. Node.js 24.22.1 dipatok di `.node-version`.

## Menjalankan lokal

```sh
npm ci
npm run dev
```

Server lokal tersedia di `http://localhost:3000`. Untuk chatbot, atur `GEMINI_API_KEY` di environment shell. Kunci ini opsional untuk fitur situs lainnya; jangan taruh di kode frontend atau commit ke repositori.

## Deploy ke Node.js host mana pun

Gunakan layanan yang mendukung proses Node.js persisten:

```sh
npm ci
npm run build
npm start
```

Atur environment variable `NODE_ENV=production` dan `GEMINI_API_KEY` di dashboard hosting. Hosting akan menyediakan `PORT`; server mendengarkan pada port itu dan bind ke `0.0.0.0`. Endpoint `/api/health` dapat dipakai untuk health check. `render.yaml` juga menyediakan konfigurasi Render.

## Deploy dengan Docker

Image multi-stage disediakan melalui `Dockerfile`. Build dan jalankan dengan:

```sh
docker build -t pbp-website .
docker run --rm -p 3000:3000 -e GEMINI_API_KEY=your-key pbp-website
```

Untuk production, kelola `GEMINI_API_KEY` melalui secret manager/container platform; hindari menyimpannya di command history atau image.

## Deploy ke Vercel

`vercel.json` mengatur build Vite, fallback SPA, serta routing `/api/*` ke Vercel Function di `api/index.ts`. Atur Root Directory ke folder proyek dan tambahkan `GEMINI_API_KEY` sebagai environment variable rahasia di Vercel.

## Penting untuk repositori deployment

Commit yang dideploy harus menyertakan seluruh `components/`, `src/assets/images/`, `api/index.ts`, serta file proyek di root. Build akan gagal jika hanya file-file root yang diunggah. Jalankan `npm run build` sebelum deploy untuk memeriksa TypeScript dan membuat bundle frontend/server.

Hosting static-only tanpa dukungan server/API tidak dapat menjalankan chatbot dan pencarian lokasi. Gunakan Node.js/Docker atau aktifkan adapter Functions yang sesuai dengan platform tersebut.
