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
  getProductByProductId
} from "./actions/product";

import {
  getAllShopByaUser,
  getShop,
  setCurrentShopName,
  createShop,
  pictureSetter
} from "./actions/shop";

export const actions = {
  //* Product
  deleteProduct,
  getAllProducts,
  getProductsByShopId,
  addProduct,
  getProductByProductId,

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
  pictureSetter
};
