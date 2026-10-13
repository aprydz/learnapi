const express = require("express");
const cors = require("cors");
const logger = require("./middleware/logger");
const { errorHandler, notFound } = require("./middleware/errorHandler");
const productRoutes = require("./routes/products");

const app = express();
const PORT = 3000;

// ==============================
// MIDDLEWARE GLOBAL
// Urutan penting! Jangan diubah sembarangan
// ==============================
app.use(cors());              // 1. Izinkan request dari frontend beda origin (atasi CORS Error)
app.use(express.json());      // 2. Biar bisa baca req.body JSON (tanpa ini req.body = undefined)
app.use(logger);              // 3. Catat setiap request

// ==============================
// ROUTES
// ==============================
// Info API (JSON) - akses di /api
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "API Berjalan! Coba akses /api/products",
    endpoints: {
      "GET /api/products": "Ambil semua produk",
      "GET /api/products/:id": "Ambil 1 produk",
      "POST /api/products": "Tambah produk (body: nama, harga, stok)",
      "PUT /api/products/:id": "Update produk",
      "DELETE /api/products/:id": "Hapus produk"
    }
  });
});

// Simulasi error 500 - buat belajar error handling
app.get("/api/error-demo", (req, res, next) => {
  try {
    throw new Error("Ini simulasi error server 500");
  } catch (err) {
    next(err); // lempar ke errorHandler
  }
});

app.use("/api/products", productRoutes);

// Frontend static - taruh SETELAH route /api biar tidak override /api
app.use(express.static("public")); // 4. Sajikan file frontend di folder public

// ==============================
// ERROR HANDLING (harus paling bawah)
// ==============================
app.use(notFound);
app.use(errorHandler);

// ==============================
// START SERVER
// ==============================
app.listen(PORT, () => {
  console.log(`✅ Server jalan di http://localhost:${PORT}`);
  console.log(`📦 Coba: http://localhost:${PORT}/api/products`);
});
