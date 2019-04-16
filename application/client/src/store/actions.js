import { defaultClient as apolloClient } from "../main";
import router from "../router";

//* Queries import here

import {
  signinUser,
  signoutUser,
  signupUser,
  getCurrentUser
} from "./actions/user";
import {
  deleteProduct,
  getAllProducts,
  getProductsByShopId,
  addProduct,
  getProductByProductId,
  searchProduct,
  updateProductRating,
  getOwnProductRating
} from "./actions/product";

import {
  getAllShopByaUser,
  getShop,
  setCurrentShopName,
  createShop,
  pictureSetter
} from "./actions/shop";

import { addOrder, getOrder } from "./actions/order";

export const actions = {
  //* Product
  deleteProduct,
  getAllProducts,
  getProductsByShopId,
  addProduct,
  getProductByProductId,
  searchProduct,
  updateProductRating,
  getOwnProductRating,

  //* User
  signinUser,
  signupUser,
  signoutUser,
  getCurrentUser,

  //* Shop
  getAllShopByaUser,
  getShop,
  createShop,
  setCurrentShopName,
  pictureSetter,

  //* order
  addOrder,
  getOrder
};
