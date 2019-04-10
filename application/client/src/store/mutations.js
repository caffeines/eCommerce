import {
  toggleAddProductDailog,
  setProducts,
  setProductsByShopId
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

  //* Shop
  setAllShopByaUser,
  setAllShopNameByaUser,
  setShop,
  setPicture,
  setcurrentShop
};
