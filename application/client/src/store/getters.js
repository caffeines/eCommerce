//! Getters
export const getters = {
  products: state => state.products,
  getProducts: state => state.products,
  loading: state => state.loading,
  user: state => state.user,
  authError: state => state.authError,
  shop: state => state.shop,
  allShopByaUser: state => state.allShopByaUser,
  entry: state => state.entry,
  currentShop: state => state.currentShop,
  allShopNameByaUser: state => state.allShopNameByaUser,
  productsByShopId: state => state.productsByShopId,
  getPicture: state => state.picture,
  addProductDailog: state => state.addProductDailog
};
