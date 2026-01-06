const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // Fruits / Vegetables / etc
  image: { type: String, required: true },
});

module.exports = mongoose.model("Store", storeSchema);
