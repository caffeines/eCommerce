import {
  toggleAddProductDailog,
  setProducts,
  setProductsByShopId,
  setProductByProductId,
  setSearchResult,
  toggleView,
  clearSearchResult,
  setOwnProductRating,
  setNumberOfProduct
} from "./mutation/product";
import { setOrder } from "./mutation/order";
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

import { setError } from "./mutation/mix";

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
  clearSearchResult,
  setOwnProductRating,

  //* Shop
  setAllShopByaUser,
  setAllShopNameByaUser,
  setShop,
  setPicture,
  setcurrentShop,

  //* mix
  setSearchResult,
  toggleView,
  setNumberOfProduct,
  setError,

  //* order
  setOrder
};
