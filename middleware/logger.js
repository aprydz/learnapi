// Middleware Logger - catat setiap request masuk
// Fundamental: Middleware = fungsi yang dijalankan SEBELUM sampai ke route
function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next(); // wajib panggil next() biar lanjut ke handler berikutnya
}

module.exports = logger;
