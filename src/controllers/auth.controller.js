const bcrypt = require("bcrypt");
const User = require("../models/User");

// Signup (hanya dijalankan sekali untuk membuat akun admin)
const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Email sudah terdaftar",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });

    res.status(201).json({
      status: "success",
      message: "Akun berhasil dibuat",
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message || "Gagal membuat akun",
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Email tidak ditemukan",
      });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({
        status: "error",
        message: "Password salah",
      });
    }

    // Simpan sesi login
    req.session.userId = user._id;

    res.status(200).json({
      status: "success",
      message: "Login berhasil",
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message || "Login gagal",
    });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    req.session.destroy(() => {
      res.status(200).json({
        status: "success",
        message: "Logout berhasil",
      });
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message || "Logout gagal",
    });
  }
};

module.exports = { signup, login, logout };
