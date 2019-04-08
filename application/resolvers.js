const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createToken = (user, secret, expiresIn) => {
  const { userName, email, role } = user;
  return jwt.sign({ userName, email, role }, secret, { expiresIn: "30d" });
};

module.exports = {
  Query: {
    /*
     ** Product fetching
     */
    getProducts: async (_, args, { Product }) => {
      const product = await Product.find({})
        .sort({
          dateOfAdd: "desc"
        })
        .populate({
          path: "createdBy",
          model: "Shop"
        });
      return product;
    },
    /*
     ** Product fetching by shop id
     */
    getProductsByShopId: async (_, args, { Product }) => {
      const product = await Product.find({ shopId: args.id })
        .sort({
          dateOfAdd: "desc"
        })
        .populate({
          path: "createdBy",
          model: "Shop"
        });
      console.log(args.id);
      return product;
    },
    /*
     ** User fetching
     */
    getUser: async (_, { userName }, { User }) => {
      const user = await User.findOne({
        userName
      });
      if (user) {
        return user;
      } else {
        throw new Error("User dosen't exists");
      }
    },
    /*
     ** Get Shop
     */

    getShop: async (_, { id }, { Shop }) => {
      const shop = await Shop.findOne({ _id: id }).populate({
        path: "owner",
        model: "User"
      });
      if (shop) {
        return shop;
      } else {
        throw new Error("Shop dosent found");
      }
    },

    //* get all shop for a single user
    getAllShopByaUser: async (_, { id }, { Shop }) => {
      const shop = await Shop.find({ ownerEmail: id }).populate({
        path: "owner",
        model: "User"
      });
      if (shop) {
        return shop;
      } else {
        throw new Error(`Shop dosen't found against _id: ${id}`);
      }
    },

    /*
     ** Current User fetching
     */
    getCurrentUser: async (_, args, { User, currentUser }) => {
      if (!currentUser) {
        return null;
      }
      const user = User.findOne({ userName: currentUser.userName }).populate({
        path: "love",
        model: "Product"
      });
      return user;
    }
  },

  Mutation: {
    /*
     ** User signup
     */
    signup: async (
      _,
      {
        firstName,
        lastName,
        contactNo,
        email,
        password,
        userName,
        dateOfBirth
      },
      { User }
    ) => {
      const user = await User.findOne({
        userName
      });
      if (user) {
        throw new Error("User already exists");
      }

      const newUser = await new User({
        firstName,
        lastName,
        contactNo,
        email,
        password,
        userName,
        dateOfBirth
      }).save();
      return { token: createToken(newUser, "sadasas") };
    },
    /*
     ** Sign in user
     */
    signin: async (_, { userName, password }, { User }) => {
      const user = await User.findOne({
        userName
      });
      if (!user) {
        throw new Error("User not found");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }

      //TODO need hide secret: "sadasas"
      return { token: createToken(user, "sadasas") };
    },

    /*
     ** Add new product
     */
    addProduct: async (
      _,
      {
        productName,
        price,
        description,
        tag,
        category,
        size,
        color,
        parent,
        picture,
        creatorId
      },
      { Product }
    ) => {
      const newProduct = new Product({
        productName,
        price,
        description,
        tag,
        category,
        size,
        color,
        parent,
        picture,
        createdBy: creatorId,
        shopId: creatorId
      }).save();
      console.log(newProduct);
      return newProduct;
    },
    /*
     ** New shop created here
     */
    createShop: async (
      _,
      { shopName, ownerId, ownerEmail, email, contactNo, address },
      { Shop }
    ) => {
      const newShop = new Shop({
        shopName,
        owner: ownerId,
        ownerEmail,
        email,
        contactNo,
        address
      }).save();
      return newShop;
    }

    /* new one starts here */
  }
};
