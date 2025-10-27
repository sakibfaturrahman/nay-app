const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Gallery = require("../models/gallery.model");

// Konfigurasi upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// CREATE
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newPhoto = new Gallery({ title, description, image, date });
    await newPhoto.save();

    res
      .status(201)
      .json({ status: "success", message: "Photo uploaded", data: newPhoto });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const photos = await Gallery.find().sort({ date: -1 });
    res.status(200).json({ status: "success", data: photos });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const photo = await Gallery.findById(req.params.id);
    if (!photo)
      return res
        .status(404)
        .json({ status: "error", message: "Photo not found" });
    res.status(200).json({ status: "success", data: photo });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// UPDATE
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updated = await Gallery.findByIdAndUpdate(
      req.params.id,
      { title, description, date, ...(image && { image }) },
      { new: true }
    );

    if (!updated)
      return res
        .status(404)
        .json({ status: "error", message: "Photo not found" });

    res
      .status(200)
      .json({ status: "success", message: "Photo updated", data: updated });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Gallery.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ status: "error", message: "Photo not found" });
    res.status(200).json({ status: "success", message: "Photo deleted" });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

module.exports = router;
