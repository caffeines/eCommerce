export const getters = {
  //* User
  loading: state => state.loading,
  user: state => state.user,
  userLoved: state => state.user && state.user.love,
  authError: state => state.authError,

  //* Product
  products: state => state.products,
  getProducts: state => state.products,
  productsByShopId: state => state.productsByShopId,
  addProductDailog: state => state.addProductDailog,
  productByProductId: state => state.productByProductId,
  ownProductRating: state => state.ownProductRating,

  //* Shop
  shop: state => state.shop,
  allShopByaUser: state => state.allShopByaUser,
  entry: state => state.entry,
  currentShop: state => state.currentShop,
  allShopNameByaUser: state => state.allShopNameByaUser,
  getPicture: state => state.picture,

  //* Search and mix
  searchResult: state => state.searchResult,
  productView: state => state.productView,
  numberOfProduct: state => state.numberOfProduct
};
