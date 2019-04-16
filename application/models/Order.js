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

orderSchema.index({
  "$**": "text"
});
module.exports = mongoose.model("Order", orderSchema);
