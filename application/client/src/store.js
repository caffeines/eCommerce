import Vue from "vue";
import Vuex from "vuex";
import { defaultClient as apolloClient } from "./main";
import router from "./router";
Vue.use(Vuex);
// @ts-ignore
import { gql } from "apollo-boost";

//* Queries import here
import {
  SIGNIN_USER,
  GET_PRODUCTS,
  GET_CURRENT_USER,
  SIGNUP_USER,
  CREATE_SHOP,
  GET_SHOP,
  ADD_PRODUCT,
  GET_ALL_SHOP_BY_A_USER
} from "./queries";
import { stat } from "fs";
import { STATES } from "mongoose";

export default new Vuex.Store({
  //! Sate
  state: {
    shop: null,
    products: [],
    user: null,
    authError: null,
    loading: false,
    entry: false,
    allShopByaUser: [],
    allShopNameByaUser: null,
    currentShop: null
  },

  //! Mutations

  mutations: {
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
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    clearUser: state => {
      state.user = null;
    }
  },

  //! Action

  actions: {
    signoutUser: async ({ commit }) => {
      commit("clearUser");
      // remove token storage in localstorage
      localStorage.setItem("token", "");
      // end session
      await apolloClient.resetStore();
      // redirect to home
      router.push("/");
      // @ts-ignore
      router.go();
    },
    getShop: ({ commit }, payload) => {
      commit("setLoading", true);
      apolloClient
        .query({
          query: GET_SHOP,
          variables: payload
        })
        .then(({ data }) => {
          commit("setLoading", false);
          commit("setShop", data.getShop);
        })
        .catch(err => {
          console.error(err);
          commit("setLoading", false);
        });
    },
    getAllShopByaUser: ({ commit }, payload) => {
      commit("setLoading", true);
      apolloClient
        .query({
          query: GET_ALL_SHOP_BY_A_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit("setLoading", false);
          let temp = [];
          for (var i = 0; i < data.getAllShopByaUser.length; i++) {
            temp.push(data.getAllShopByaUser[i].shopName);
          }
          //console.log("temp:", temp[0]);
          commit("setAllShopNameByaUser", temp);
          commit("setAllShopByaUser", data.getAllShopByaUser);
        })
        .catch(err => {
          console.error(err);
          commit("setLoading", false);
        });
    },
    setCurrentShopName: ({ commit }, payload) => {
      console.log(payload);
      commit("setcurrentShop", payload);
    },
    getCurrentUser: ({ commit }) => {
      commit("setLoading", true);
      apolloClient
        .query({
          query: GET_CURRENT_USER
        })
        .then(({ data }) => {
          commit("setLoading", false);
          // add User data to state.user
          commit("setUser", data.getCurrentUser);
        })
        .catch(err => {
          console.error(err);
          commit("setLoading", false);
        });
    },

    getAllProducts: ({ commit }) => {
      commit("setLoading", true);
      apolloClient
        .query({
          query: GET_PRODUCTS
        })
        .then(({ data }) => {
          commit("setProducts", data.getProducts);
          commit("setLoading", false);
        })
        .catch(err => {
          commit("setLoading", false);
          console.error(err);
        });
    },

    // @ts-ignore
    signinUser: ({ commit }, payload) => {
      commit("setLoading", true);
      //* clear token to prevent errors
      localStorage.setItem("token", "");
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit("setLoading", false);
          //* console.log(data.signin);
          localStorage.setItem("token", data.signin.token);
          // to make sure created method is run in main.js  ( we ru getCurrentUser ), reload page
          // @ts-ignore
          router.go();
        })
        .catch(err => {
          commit("setLoading", false);
          console.error(err);
        });
    },
    signupUser: ({ commit }, payload) => {
      commit("setLoading", true);
      //* clear token to prevent errors
      localStorage.setItem("token", "");
      apolloClient
        .mutate({
          mutation: SIGNUP_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit("setLoading", false);
          //localStorage.setItem("token", data.signup.token);
          // to make sure created method is run in main.js  ( we ru getCurrentUser ), reload page
          commit("signinSet");
          // @ts-ignore
          router.push("/signin");
        })
        .catch(err => {
          commit("setLoading", false);
          console.error(err);
        });
    },
    createShop: ({ commit }, payload) => {
      commit("setLoading", true);

      apolloClient
        .mutate({
          mutation: CREATE_SHOP,
          variables: payload
        })
        .then(({ data }) => {
          commit("setLoading", false);
          console.log(data);
          // @ts-ignore
          router.push(`/shop/${data.createShop._id}`);
        })
        .catch(err => {
          commit("setLoading", false);
          console.error(err);
        });
    },
    addProduct: ({ commit }, payload) => {
      commit("setLoading", true);

      apolloClient
        .mutate({
          mutation: ADD_PRODUCT,
          variables: payload
        })
        .then(({ data }) => {
          commit("setLoading", false);
          console.log("addProduct: ", data);
        })
        .catch(err => {
          commit("setLoading", false);
          console.error(err);
        });
    }
  },

  //! Getters
  getters: {
    getProducts: state => state.products,
    loading: state => state.loading,
    user: state => state.user,
    authError: state => state.authError,
    shop: state => state.shop,
    allShopByaUser: state => state.allShopByaUser,
    entry: state => state.entry,
    currentShop: state => state.currentShop,
    allShopNameByaUser: state => state.allShopNameByaUser
  }
});
