const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");

const rateLimiter = require("./middlewares/rate.middleware");
const connectDB = require("./config/database");

dotenv.config(); // Load .env

const app = express();

// --- Middleware utama ---
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

// --- Session (untuk login admin) ---
app.use(
  session({
    secret: process.env.SESSION_SECRET || "ulangtahun-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 jam
  })
);

// --- Static files (gambar & frontend) ---
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(express.static(path.join(__dirname, "..", "public")));

// --- Routes ---
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/gallery", require("./routes/gallery.routes"));
app.use("/", require("./routes/frontend.routes"));

// --- Error handler ---
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ message: err.message || "Internal server error" });
});

// --- Koneksi Database & Jalankan Server ---
connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server aktif di http://localhost:${PORT}`);
  });
});

module.exports = app;
