const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      productItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number,
        required: true
      },
      color: {
        type: String,
        required: true
      },
      size: {
        type: String,
        required: true
      }
    }
  ],
  shippingType: {
    type: String,
    required: true
  },
  address: {
    addressLine: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  consumer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  consumerEmail: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

orderSchema.index({
  "$**": "text"
});
module.exports = mongoose.model("Order", orderSchema);
