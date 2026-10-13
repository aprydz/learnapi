# Belajar API Node.js - Fundamental REST API

Project API sederhana CRUD Produk pakai Express + Array (tanpa database). Dibuat khusus buat paham fundamental.

## Cara Jalanin

```bash
cd D:\belajar\belajar-api-nodejs
npm install
npm start
# atau dev mode (auto reload)
npm run dev
```

Buka:
- API Info: http://localhost:3000/
- List Produk: http://localhost:3000/api/products
- Frontend Mini: http://localhost:3000/  (file public/index.html otomatis keserve)

## 5 Endpoint

| Method | URL | Body | Sukses |
|--------|-----|------|--------|
| GET | /api/products | - | 200 |
| GET | /api/products/:id | - | 200 / 404 |
| POST | /api/products | {nama, harga, stok} | 201 / 400 |
| PUT | /api/products/:id | {nama?, harga?, stok?} | 200 / 404 |
| DELETE | /api/products/:id | - | 200 / 404 |

## Test pakai curl / PowerShell

```powershell
# GET semua
curl http://localhost:3000/api/products

# POST tambah (PowerShell)
Invoke-RestMethod -Uri http://localhost:3000/api/products -Method POST -ContentType "application/json" -Body '{"nama":"Tas Ransel","harga":150000,"stok":7}'

# PUT update
Invoke-RestMethod -Uri http://localhost:3000/api/products/1 -Method PUT -ContentType "application/json" -Body '{"harga":80000}'

# DELETE
Invoke-RestMethod -Uri http://localhost:3000/api/products/1 -Method DELETE
```

## Fundamental Yang Dipelajari

1. HTTP Method & Routing
2. Request Body (express.json) & Params
3. Response JSON + Status Code (200, 201, 400, 404, 500)
4. Middleware (cors, logger, errorHandler)
5. Validasi input & Error handling biar server tidak crash

## Kalau API Error - Apa Dampak & Solusi

- **404** -> Frontend tampilkan "Data tidak ditemukan" (jangan loading muter terus)
- **400** -> Validasi di backend + tampilkan pesan di bawah input frontend
- **500** -> Tangkap pakai try/catch + next(err) -> errorHandler, server tetap hidup
- **CORS** -> Sudah diatasi pakai `app.use(cors())`
- **Timeout/Lambat** -> Frontend kasih loading + retry

Lihat `public/index.html` untuk contoh penanganan error di sisi frontend.
