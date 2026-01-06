// const express = require("express");
// const Wishlist = require("../models/Wishlist");
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

// // GET wishlist
// router.get("/", auth, async (req, res) => {
//   const wishlist = await Wishlist.findOne({ user: req.userId }).populate("products");
//   res.json(wishlist?.products || []);
// });

// // ADD to wishlist
// router.post("/add", auth, async (req, res) => {
//   const { productId } = req.body;
//   let wishlist = await Wishlist.findOne({ user: req.userId });
//   if (!wishlist) {
//     wishlist = new Wishlist({ user: req.userId, products: [] });
//   }

//   if (!wishlist.products.includes(productId)) {
//     wishlist.products.push(productId);
//   }

//   await wishlist.save();
//   res.json(wishlist.products);
// });

// // REMOVE from wishlist
// router.post("/remove", auth, async (req, res) => {
//   const { productId } = req.body;
//   const wishlist = await Wishlist.findOne({ user: req.userId });
//   if (!wishlist) return res.json([]);

//   wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
//   await wishlist.save();
//   res.json(wishlist.products);
// });

// module.exports = router;



const express = require("express");
const Wishlist = require("../models/Wishlist");
const jwt = require("jsonwebtoken");
const router = express.Router();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// GET WISHLIST
router.get("/", auth, async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.userId }).populate("products");
  res.json(wishlist?.products || []);
});

// ADD
router.post("/add", auth, async (req, res) => {
  const { productId } = req.body;

  let wishlist = await Wishlist.findOne({ user: req.userId });
  if (!wishlist) wishlist = new Wishlist({ user: req.userId, products: [] });

  if (!wishlist.products.includes(productId)) {
    wishlist.products.push(productId);
  }

  await wishlist.save();
  res.json(wishlist.products);
});

// REMOVE
router.delete("/:id", auth, async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.userId });
  if (!wishlist) return res.json([]);

  wishlist.products = wishlist.products.filter(
    (p) => p.toString() !== req.params.id
  );

  await wishlist.save();
  res.json(wishlist.products);
});

module.exports = router;
