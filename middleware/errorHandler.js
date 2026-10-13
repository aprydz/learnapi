// Middleware Error Handler - tangkap semua error biar server tidak crash
// Fundamental: Tanpa ini, error 500 bikin server mati. Dengan ini, server balas JSON error dan tetap hidup.
function errorHandler(err, req, res, next) {
  console.error("[ERROR]", err.message);
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan di server",
    error: err.message // di production jangan tampilkan detail ini
  });
}

// Middleware 404 - kalau route tidak ditemukan
function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} tidak ditemukan`
  });
}

module.exports = { errorHandler, notFound };
