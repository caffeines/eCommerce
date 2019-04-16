const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  purchaseItems: [
    {
      productItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number
      },
      color: {
        type: String
      },
      size: {
        type: String
      }
    }
  ],
  shippingType: {
    type: String,
    required: true
  },
  address: {
    addressLine: {
      type: String
    },
    fullName: {
      type: String
    },
    contact: {
      type: String
    },
    state: {
      type: String
    },
    city: {
      type: String
    },
    zip: {
      type: String
    },
    country: {
      type: String
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

module.exports = mongoose.model("Order", orderSchema);
