const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  contactNo: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  dateOfRegistration: {
    type: Date,
    default: Date.now
  },
  profilePic: {
    type: String
  },
  coverPic: {
    type: String
  },
  role: {
    type: String,
    default: "public"
  },
  love: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Product"
  }
});

// @ts-ignore
userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    // @ts-ignore
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      // @ts-ignore
      this.password = hash;
      next();
    });
  });
});

userSchema.index({
  "$**": "text"
});
module.exports = mongoose.model("User", userSchema);
