export const getters = {
  //* User
  loading: state => state.loading,
  user: state => state.user,
  authError: state => state.authError,

  //* Product
  products: state => state.products,
  getProducts: state => state.products,
  productsByShopId: state => state.productsByShopId,
  addProductDailog: state => state.addProductDailog,

  //* Shop
  shop: state => state.shop,
  allShopByaUser: state => state.allShopByaUser,
  entry: state => state.entry,
  currentShop: state => state.currentShop,
  allShopNameByaUser: state => state.allShopNameByaUser,
  getPicture: state => state.picture
};
