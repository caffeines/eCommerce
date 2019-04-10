export const mutations = {
  toggleAddProductDailog: state => {
    state.addProductDailog = !state.addProductDailog;
  },
  setPicture: (state, payload) => {
    state.picture = payload;
  },
  setcurrentShop: (state, payload) => {
    state.currentShop = payload;
  },
  setAllShopNameByaUser: (state, payload) => {
    state.allShopNameByaUser = payload;
  },
  setShop: (state, payload) => {
    state.shop = payload;
  },
  setAllShopByaUser: (state, payload) => {
    state.allShopByaUser = payload;
  },
  signinSet: state => {
    state.entry = false;
  },
  signupSet: state => {
    state.entry = true;
  },
  setAuthError: (state, payload) => {
    state.authError = payload;
  },
  setUser: (state, payload) => {
    state.user = payload;
  },
  setProducts: (state, payload) => {
    state.products = payload;
  },
  setProductsByShopId: (state, payload) => {
    state.productsByShopId = payload;
  },
  setLoading: (state, payload) => {
    state.loading = payload;
  },
  clearUser: state => {
    state.user = null;
  }
};
