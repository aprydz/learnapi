const express = require("express");
const router = express.Router();
const { products, getNextId } = require("../data/products");

// ==============================
// GET /api/products - Ambil semua produk
// Status: 200 OK
// ==============================
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Berhasil ambil semua produk",
    data: products,
    total: products.length
  });
});

// ==============================
// GET /api/products/:id - Ambil 1 produk
// Status: 200 OK atau 404 Not Found
// ==============================
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Produk dengan id ${id} tidak ditemukan`
    });
  }

  res.json({
    success: true,
    data: product
  });
});

// ==============================
// POST /api/products - Tambah produk baru
// Status: 201 Created atau 400 Bad Request
// ==============================
router.post("/", (req, res) => {
  const { nama, harga, stok } = req.body;

  // Validasi - Fundamental: Jangan percaya input user!
  if (!nama || harga === undefined) {
    return res.status(400).json({
      success: false,
      message: "Field 'nama' dan 'harga' wajib diisi",
      contoh: { nama: "Kaos Baru", harga: 50000, stok: 10 }
    });
  }

  if (typeof harga !== "number" || harga <= 0) {
    return res.status(400).json({
      success: false,
      message: "Field 'harga' harus angka > 0"
    });
  }

  const newProduct = {
    id: getNextId(),
    nama: nama.trim(),
    harga,
    stok: stok !== undefined ? stok : 0
  };

  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: "Produk berhasil ditambahkan",
    data: newProduct
  });
});

// ==============================
// PUT /api/products/:id - Update produk
// Status: 200 OK atau 404 / 400
// ==============================
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Produk dengan id ${id} tidak ditemukan`
    });
  }

  const { nama, harga, stok } = req.body;

  // Validasi kalau harga dikirim harus valid
  if (harga !== undefined && (typeof harga !== "number" || harga <= 0)) {
    return res.status(400).json({
      success: false,
      message: "Field 'harga' harus angka > 0"
    });
  }

  // Update hanya field yang dikirim
  if (nama !== undefined) products[index].nama = nama.trim();
  if (harga !== undefined) products[index].harga = harga;
  if (stok !== undefined) products[index].stok = stok;

  res.json({
    success: true,
    message: "Produk berhasil diupdate",
    data: products[index]
  });
});

// ==============================
// DELETE /api/products/:id - Hapus produk
// Status: 200 OK atau 404
// ==============================
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Produk dengan id ${id} tidak ditemukan`
    });
  }

  const deleted = products.splice(index, 1)[0];

  res.json({
    success: true,
    message: "Produk berhasil dihapus",
    data: deleted
  });
});

module.exports = router;
