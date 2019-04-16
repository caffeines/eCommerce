const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  purchaseItems: [
    {
      productItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      productName: {
        type: String
      },
      //TODO zfas
      shopName: {
        type: String
      },
      pictiure: {
        type: String
      },
      shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
      },
      price: {
        type: Number
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
    address: {
      type: String
    },
    name: {
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
  },
  orderedDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "InQueue"
  }
});

module.exports = mongoose.model("Order", orderSchema);
