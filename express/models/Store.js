const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
});

module.exports = mongoose.model("Store", storeSchema);
