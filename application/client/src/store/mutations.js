import {
  toggleAddProductDailog,
  setProducts,
  setProductsByShopId,
  setProductByProductId
} from "./mutation/product";

import {
  setLoading,
  signinSet,
  signupSet,
  setAuthError,
  setUser,
  clearUser
} from "./mutation/user";

import {
  setAllShopByaUser,
  setShop,
  setPicture,
  setcurrentShop,
  setAllShopNameByaUser
} from "./mutation/shop";

export const mutations = {
  //* User
  setLoading,
  signinSet,
  signupSet,
  setAuthError,
  setUser,
  clearUser,

  //* Product
  toggleAddProductDailog,
  setProducts,
  setProductsByShopId,
  setProductByProductId,

  //* Shop
  setAllShopByaUser,
  setAllShopNameByaUser,
  setShop,
  setPicture,
  setcurrentShop
};
