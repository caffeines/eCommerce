const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createToken = (user, secret, expiresIn) => {
  const { userName, email, role } = user;
  return jwt.sign({ userName, email, role }, secret, { expiresIn: "30d" });
};

module.exports = {
  Query: {
    searchAny: async (_, { any }, { User, Product, Shop }) => {
      if (any) {
        const searchProduct = await Product.find(
          { $text: { $search: any } },
          { score: { $meta: "textScore" } }
        )
          .sort({
            score: { $meta: "textScore" },
            rating: "desc"
          })
          .limit(15);
        const searchShop = await Shop.find(
          { $text: { $search: any } },
          { score: { $meta: "textScore" } }
        )
          .sort({
            score: { $meta: "textScore" },
            rating: "desc"
          })
          .limit(15);

        const searchUser = await User.find(
          { $text: { $search: any } },
          { score: { $meta: "textScore" } }
        ).limit(15);

        return {
          shop: searchShop,
          product: searchProduct,
          user: searchUser
        };
      }
    },
    getOrder: async (_, {}, { Order }) => {
      const order = await Order.find({})
        .sort({
          dateOfAdd: "desc"
        })
        .populate({
          path: "createdBy",
          model: "Shop"
        });
      return order;
    },
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
    },

    //* get own product rating
    getOwnProductRating: async (_, { productId, userId }, { User }) => {
      const user = await User.findOne({ _id: userId });
      //console.log(user);
      let oldRating = 0,
        matched = false;
      for (let i = 0; i < user.ratedProduct.length; i++) {
        if (user.ratedProduct[i].productId == productId) {
          oldRating = user.ratedProduct[i].rating;
          matched = true;
          //console.log( "Matched: ", user.ratedProduct[ i ].productId );
        }
      }
      return { rating: oldRating };
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
      //TODO need to hide secret token
      return { token: createToken(newUser, process.env.SECRET) };
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
      return { token: createToken(user, process.env.SECRET) };
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
    },

    //* Add carousel
    addCarousel: async (
      _,
      {
        title,
        buttonColor,
        titleColor,
        subtitle,
        subtitleColor,
        src,
        button,
        shopId
      },
      { Shop }
    ) => {
      const newCarousel = {
        title,
        buttonColor,
        titleColor,
        subtitle,
        subtitleColor,
        src,
        button
      };
      const product = await Shop.findOneAndUpdate(
        //! first find the product by id
        { _id: shopId },
        //! prepned new comment to the beginning of comment array
        { $push: { coverPic: { $each: [newCarousel], $position: 0 } } },

        { new: true }
      );
      return product.coverPic[0];
    },

    //! update product rating
    //*  update product rating
    //! update product rating

    updateProductRating: async (
      _,
      { productId, userId, givenRating },
      { User, Product }
    ) => {
      const user = await User.findOne({ _id: userId });
      //console.log(user);
      let oldRating = 0,
        matched = false;
      for (let i = 0; i < user.ratedProduct.length; i++) {
        if (user.ratedProduct[i].productId == productId) {
          oldRating = user.ratedProduct[i].rating;
          matched = true;
          //console.log("Matched: ", user.ratedProduct[i].productId);
        }
      }

      const tempProduct = await Product.findOne({ _id: productId });
      //console.log(tempProduct.rating.rate);

      let newRating = givenRating - oldRating;
      const tempRating = tempProduct.rating.rate; // old avg rating in product
      let noOfRat = tempProduct.rating.totalNumberOfRating; // no. of users who gave rating

      /*console.log(
        "givenRating",
        givenRating,
        tempProduct.productName,
        tempRating,
        noOfRat,
        "Old rating: ",
        oldRating
      );*/

      let finalRating;
      if (oldRating || givenRating == 0 || matched) {
        finalRating = (newRating + tempRating * noOfRat) / noOfRat;
      } else {
        noOfRat += 1;
        finalRating = (newRating + tempRating * (noOfRat - 1)) / noOfRat;
      }
      const rat = {
        rate: finalRating,
        totalNumberOfRating: noOfRat
      };
      const product = await Product.findOneAndUpdate(
        { _id: productId },
        {
          $set: {
            rating: rat
          }
        },
        { new: true }
      );
      const updatedRatedProduct = {
        productId: productId,
        rating: finalRating
      };
      let updatedUser;
      if (matched) {
        updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { $set: { ratedProduct: updatedRatedProduct } },
          { new: true }
        ).populate({
          path: "ratedProduct.productId",
          model: "Product"
        });
      } else {
        updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { ratedProduct: updatedRatedProduct } },
          { new: true }
        ).populate({
          path: "ratedProduct.productId",
          model: "Product"
        });
      }

      //console.log("updatedUser: ", updatedUser);
      //console.log("updatedProduct: ", product);

      return product;
    },

    //* add order => checkout
    addOrder: async (
      _,
      { consumer, consumerEmail, shippingType, total, purchaseItems, address },
      { Order }
    ) => {
      const newOrder = new Order({
        consumer,
        consumerEmail,
        shippingType,
        total,
        purchaseItems,
        address
      }).save();
      return newOrder;
    }
    /* new one starts here */
  }
};
