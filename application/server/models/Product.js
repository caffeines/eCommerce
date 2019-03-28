const mongoose = require( 'mongoose' );

const productSchema = new mongoose.Schema( {
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
  comment: [ {
    body: {
      type: String,
      required: true
    },
    commentUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    commentDate: {
      type: Date,
      default: Date.now
    },
    like: {
      type: Number,
      default: 0
    }
  } ],
  rating: {
    type: Number,
    default: 0
  },
  tag: {
    type: [ String ],
    required: true
  },
  category: {
    type: [ String ],
    required: true
  },
  size: {
    type: [ String ],
    required: true
  },
  color: {
    type: [ String ],
    required: true
  },
  parent: {
    type: String // product company
  },
  discountPrice: {
    type: Number
  },
  picture: {
    type: [ String ],
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
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  }
} );

module.exports = mongoose.model( 'Product', productSchema );
