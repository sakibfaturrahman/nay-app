const express = require("express");
const router = express.Router();
const path = require("path");

// Halaman utama (Home)
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

// Halaman About
router.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/about.html"));
});

// Halaman Gallery
router.get("/gallery", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/gallery.html"));
});

// Dashboard admin
router.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/admin.html"));
});

module.exports = router;
