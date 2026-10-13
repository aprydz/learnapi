// Data dummy - disimpan di array (tanpa database)
// Fundamental: Ini simulasi database sederhana
let products = [
  { id: 1, nama: "Kaos Polos Hitam", harga: 75000, stok: 10 },
  { id: 2, nama: "Celana Jeans Slim", harga: 250000, stok: 5 },
  { id: 3, nama: "Sepatu Sneakers Putih", harga: 400000, stok: 3 }
];

// Helper buat generate ID baru
function getNextId() {
  return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
}

module.exports = { products, getNextId };
