export const toggleAddProductDailog = state => {
  state.addProductDailog = !state.addProductDailog;
};
export const setProducts = (state, payload) => {
  state.products = payload;
};
export const setProductsByShopId = (state, payload) => {
  state.productsByShopId = payload;
};
