const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/User");
const Store = require("./models/Store");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

/* ----------------------- 🧩 USER AUTH ROUTES ----------------------- */

// 🔹 Register Route
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ----------------------- 🛒 PRODUCT ROUTES ----------------------- */

// 🔹 Add new product
app.post("/api/store", async (req, res) => {
  try {
    const { name, category, price, image } = req.body;

    if (!name || !category || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Store({ name, category, price, image });
    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully", newProduct });
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Get all products by category
app.get("/api/store/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Store.find({ category });
    res.json(products);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 🔍 Search products by name
app.get("/api/products", async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const products = await Store.find({
      name: { $regex: searchQuery, $options: "i" }, // case-insensitive
    });
    res.json(products);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ----------------------- 👤 PROFILE ROUTE ----------------------- */

app.get("/api/profile", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

/* ----------------------- 🚀 SERVER START ----------------------- */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




