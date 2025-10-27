const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");
const User = require("../models/user.model");

// Inisialisasi session di app utama (lihat di bawah bagian server.js)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email });

    if (!admin) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid password" });
    }

    req.session.user = { id: admin._id, email: admin.email, name: admin.name };
    res.status(200).json({ status: "success", message: "Login successful" });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res
      .status(200)
      .json({ status: "success", message: "Logged out successfully" });
  });
});

module.exports = router;
