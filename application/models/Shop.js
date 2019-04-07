const mongoose = require("mongoose");
var rug = require("random-username-generator");

const shopSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true
  },
  shopId: {
    type: String,
    trim: true,
    unique: true,
    default: rug.generate()
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  ownerEmail: {
    type: String,
    trim: true
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
    type: String
  },
  coverPic: [
    {
      src: {
        type: String,
        required: true
      },
      head: {
        type: String,
        required: true
      },
      shrotDescription: {
        type: String,
        required: true
      }
    }
  ],
  rating: {
    type: Number,
    default: 0
  },
  kudos: [
    {
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
    }
  ]
});

module.exports = mongoose.model("Shop", shopSchema);
