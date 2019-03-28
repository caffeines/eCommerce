const mongoose = require( 'mongoose' );
const shopSchema = new mongoose.Schema( {
  shopName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  contactNo: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  dateOfCreate: {
    type: Date,
    default: Date.now
  },
  logo: {
    type: String,
  },
  coverPic: {
    type: String
  },
  rating: {
    type: Number,
    default: 0
  },
  kudos: [ {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    year: {
      type: String
    }
  } ]

} );

module.exports = mongoose.model( 'Shop', shopSchema );
