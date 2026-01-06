const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/User");
const Store = require("./models/Store");

const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

const app = express();

/* ----------------------- ✅ MIDDLEWARE ----------------------- */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://aswinisgrocery.web.app",
      "https://mini-project-57ws.onrender.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/* ----------------------- ✅ MONGODB CONNECTION ----------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("Mongo error:", err));

/* ----------------------- 👤 AUTH ROUTES ----------------------- */
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Register error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
});

/* ----------------------- 🛒 STORE ROUTES ----------------------- */

// ADD PRODUCT
app.post("/api/store", async (req, res) => {
  try {
    const { name, category, price, image } = req.body;
    const product = new Store({ name, category, price, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Add product error" });
  }
});

// GET PRODUCTS BY CATEGORY (CASE INSENSITIVE)
app.get("/api/store/:category", async (req, res) => {
  try {
    const products = await Store.find({
      category: { $regex: new RegExp(`^${req.params.category}$`, "i") }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET ALL PRODUCTS (OPTIONAL SEARCH)
app.get("/api/products", async (req, res) => {
  try {
    const search = req.query.search || "";
    const products = await Store.find({
      name: { $regex: search, $options: "i" },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Search error" });
  }
});

/* ----------------------- 🛒 CART & ❤️ WISHLIST ----------------------- */
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);

/* ----------------------- 🚀 SERVER START ----------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
