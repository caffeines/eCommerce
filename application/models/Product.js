const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    required: true
  },
  comments: [
    {
      body: {
        type: String,
        required: true
      },
      commentUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      commentDate: {
        type: Date,
        default: Date.now
      },
      like: {
        type: Number,
        default: 0
      }
    }
  ],
  rating: {
    type: Number,
    default: 0
  },
  tag: {
    type: [String],
    required: true
  },
  category: {
    type: [String],
    required: true
  },
  size: {
    type: [String],
    required: true
  },
  color: {
    type: [String],
    required: true
  },
  parent: {
    type: String // product company
  },
  discountPrice: {
    type: Number
  },
  picture: {
    type: [String],
    required: true
  },
  dateOfAdd: {
    type: Date,
    default: Date.now
  },
  love: {
    type: Number,
    default: 0
  },
  shopId: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop"
  }
});

productSchema.index({
  "$**": "text"
});
module.exports = mongoose.model("Product", productSchema);
