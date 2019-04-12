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
