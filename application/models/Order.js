const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ],
  consumer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  consumerEmail: {
    type: String,
    required: true
  }
});

productSchema.index({
  "$**": "text"
});
module.exports = mongoose.model("Product", productSchema);
