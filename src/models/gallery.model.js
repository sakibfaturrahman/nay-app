const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String, // path atau URL gambar
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // otomatis isi tanggal upload
  },
});

module.exports = mongoose.model("Gallery", gallerySchema);
