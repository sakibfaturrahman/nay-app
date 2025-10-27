const { validationResult } = require("express-validator");
const Gallery = require("../models/gallery.model");

// CREATE (Upload Foto)
const create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const photo = new Gallery({
      title: req.body.title,
      description: req.body.description,
      image: imagePath,
      date: req.body.date || Date.now(),
    });

    await photo.save();

    res.status(201).json({
      status: "success",
      message: "Photo uploaded successfully",
      data: photo,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message || "Failed to upload photo",
    });
  }
};

// GET 1 FOTO
const get = async (req, res) => {
  try {
    const photo = await Gallery.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({
        status: "error",
        message: "Photo not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: photo,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message || "Failed to get photo",
    });
  }
};

// GET SEMUA FOTO
const list = async (req, res) => {
  try {
    const photos = await Gallery.find().sort({ date: -1 });
    res.status(200).json({
      status: "success",
      count: photos.length,
      data: photos,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message || "Failed to get photos",
    });
  }
};

// UPDATE FOTO
const update = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updated = await Gallery.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        ...(imagePath && { image: imagePath }),
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        status: "error",
        message: "Photo not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Photo updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message || "Failed to update photo",
    });
  }
};

// DELETE FOTO
const remove = async (req, res) => {
  try {
    const deleted = await Gallery.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: "Photo not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Photo deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message || "Failed to delete photo",
    });
  }
};

module.exports = { create, get, list, update, remove };
