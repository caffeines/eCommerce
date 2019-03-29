import Vue from "vue";
import Vuex from "vuex";
import { defaultClient as apolloClient } from "./main";
Vue.use(Vuex);
import { gql } from "apollo-boost";

//Todo Queries import here
import { SIGNIN_USER, GET_PRODUCTS } from "./queries";

export default new Vuex.Store({
  state: {
    products: [],
    loading: false
  },
  mutations: {
    setProducts: (state, payload) => {
      state.products = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    }
  },
  actions: {
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
    signinUser: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          //*console.log(data.signin);
          localStorage.setItem("token", data.signin.token);
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  getters: {
    getProducts: state => state.products,
    loading: state => state.loading
  }
});
