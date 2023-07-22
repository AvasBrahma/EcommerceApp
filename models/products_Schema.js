const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: Namber,
    default: "",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  dateCreated:{
    type: Date,
    default: Date.now,
  },
});
const Products = mongoose.model("Products", productSchema);

module.exports = Products;
