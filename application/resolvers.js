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
    getProductsByShopId: async (_, { id }, { Product }) => {
      const product = await Product.find({ shopId: id })
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

    //* infinite scroll
    infiniteScrollProduct: async (_, { pageNum, pageSize }, { Product }) => {
      let products;
      if (pageNum == 1) {
        products = await Product.find({})
          .sort({ createdDate: "Desc" })
          .populate({
            path: "createdBy",
            model: "Shop"
          })
          .limit(pageSize);
      } else {
        const skips = pageSize * (pageNum - 1);
        products = await Product.find({})
          .sort({ createdDate: "Desc" })
          .populate({
            path: "createdBy",
            model: "Shop"
          })
          .skip(skips)
          .limit(pageSize);
      }
      const totalDocs = await Product.countDocuments();
      const hasMore = totalDocs > pageSize * pageNum;

      return { products, hasMore };
    },

    //* get product by product by product id
    getProductByProductId: async (_, { id }, { Product }) => {
      const product = await Product.findOne({ _id: id })
        .populate({
          path: "createdBy",
          model: "Shop"
        })
        .populate({
          path: "comments.commentUser",
          model: "User"
        });
      if (product) {
        return product;
      } else {
        return new Error("Product not found");
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
    },
    //! delete product
    deleteProduct: async (_, { id }, { Product }) => {
      const product = await Product.findOneAndRemove({ _id: id });
      return product;
    },

    //* add comment
    addComment: async (_, { body, userId, productId }, { Product }) => {
      const newComment = {
        body,
        commentUser: userId
      };
      console.log(userId);
      const product = await Product.findOneAndUpdate(
        //! first find the product by id
        { _id: productId },
        //! prepned new comment to the beginning of comment array
        { $push: { comments: { $each: [newComment], $position: 0 } } },

        { new: true }
      ).populate({
        path: "comments.commentUser",
        model: "User"
      });
      console.log(product.comments[0]);
      return product.comments[0];
    },

    //* love && unlove

    loveProduct: async (_, { productId, userName }, { Product, User }) => {
      const product = await Product.findOneAndUpdate(
        { _id: productId },
        { $inc: { love: 1 } },
        { new: true }
      );

      const user = await User.findOneAndUpdate(
        { userName },
        { $addToSet: { love: productId } },
        { new: true }
      ).populate({
        path: "love",
        model: "Product"
      });
      return {
        loves: product.love,
        wishList: user.love
      };
    },

    unLoveProduct: async (_, { productId, userName }, { Product, User }) => {
      const product = await Product.findOneAndUpdate(
        { _id: productId },
        { $inc: { love: -1 } },
        { new: true }
      );

      const user = await User.findOneAndUpdate(
        { userName },
        { $pull: { love: productId } },
        { new: true }
      ).populate({
        path: "love",
        model: "Product"
      });
      return {
        loves: product.love,
        wishList: user.love
      };
    }
    /* new one starts here */
  }
};
