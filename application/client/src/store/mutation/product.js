import { stat } from "fs";

export const toggleAddProductDailog = state => {
  state.addProductDailog = !state.addProductDailog;
};
export const setProducts = (state, payload) => {
  state.products = payload;
};
export const setProductsByShopId = (state, payload) => {
  state.productsByShopId = payload;
};
export const setProductByProductId = (state, payload) => {
  state.productByProductId = payload;
};

//* mix
export const setSearchResult = (state, payload) => {
  state.searchResult = payload;
};
export const toggleView = (state, payload) => {
  state.productView = payload;
};

export const clearSearchResult = state => {
  state.searchResult = null;
};

export const setOwnProductRating = (state, payload) => {
  state.ownProductRating = payload;
};

//* set number of product in cart for badge
export const setNumberOfProduct = state => {
  var cartFormLocalstorage = window.localStorage.getItem("cart");
  let myCart = JSON.parse(cartFormLocalstorage);
  state.numberOfProduct = myCart.length;
};
