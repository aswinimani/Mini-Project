// const express = require("express");
// const Cart = require("../models/Cart");
// const jwt = require("jsonwebtoken");
// const router = express.Router();

// // Auth middleware
// const auth = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// // GET cart
// router.get("/", auth, async (req, res) => {
//   const cart = await Cart.findOne({ user: req.userId }).populate("products.product");
//   res.json(cart?.products || []);
// });

// // ADD to cart
// router.post("/add", auth, async (req, res) => {
//   const { productId, quantity } = req.body;
//   let cart = await Cart.findOne({ user: req.userId });
//   if (!cart) {
//     cart = new Cart({ user: req.userId, products: [] });
//   }

//   const exists = cart.products.find(p => p.product.toString() === productId);
//   if (exists) {
//     exists.quantity += quantity || 1;
//   } else {
//     cart.products.push({ product: productId, quantity: quantity || 1 });
//   }

//   await cart.save();
//   res.json(cart.products);
// });

// // REMOVE from cart
// router.post("/remove", auth, async (req, res) => {
//   const { productId } = req.body;
//   const cart = await Cart.findOne({ user: req.userId });
//   if (!cart) return res.json([]);

//   cart.products = cart.products.filter(p => p.product.toString() !== productId);
//   await cart.save();
//   res.json(cart.products);
// });

// module.exports = router;




const express = require("express");
const Cart = require("../models/Cart");
const jwt = require("jsonwebtoken");
const router = express.Router();

// AUTH MIDDLEWARE
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ GET CART
router.get("/", auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId }).populate("products.product");
  res.json(cart?.products || []);
});

// ✅ ADD TO CART
router.post("/add", auth, async (req, res) => {
  const { productId } = req.body;

  let cart = await Cart.findOne({ user: req.userId });
  if (!cart) cart = new Cart({ user: req.userId, products: [] });

  const item = cart.products.find(p => p.product.toString() === productId);

  if (item) {
    item.quantity += 1;
  } else {
    cart.products.push({ product: productId, quantity: 1 });
  }

  await cart.save();
  res.json(cart.products);
});

// ✅ REMOVE
router.post("/remove", auth, async (req, res) => {
  const { productId } = req.body;

  const cart = await Cart.findOne({ user: req.userId });
  if (!cart) return res.json([]);

  cart.products = cart.products.filter(p => p.product.toString() !== productId);
  await cart.save();

  res.json(cart.products);
});

module.exports = router;
