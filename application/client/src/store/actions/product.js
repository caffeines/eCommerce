import { defaultClient as apolloClient } from "../../main";
import router from "../../router";
import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  GET_PRODUCT_BY_SHOPID,
  DELETE_PRODUCT_BY_ID,
  GET_PRODUCT_BY_PRODUCT_ID,
  SEARCH,
  UPDATE_PRODUCT_RATING,
  GET_OWN_PRODUCT_RATING
} from "../../queries/product";

export const deleteProduct = ({ state, commit }, payload) => {
  commit("setLoading", true);
  apolloClient
    .mutate({
      mutation: DELETE_PRODUCT_BY_ID,
      variables: payload
    })
    .then(({ data }) => {
      console.log(data);
    })
    .catch(err => {
      console.error(err);
    });
};

export const searchProduct = ({ commit }, payload) => {
  apolloClient
    .query({
      query: SEARCH,
      variables: payload
    })
    .then(({ data }) => {
      console.log(data.searchAny);
      commit("setSearchResult", data.searchAny);
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProductsByShopId = ({ commit }, payload) => {
  commit("setLoading", true);
  apolloClient
    .query({
      query: GET_PRODUCT_BY_SHOPID,
      variables: payload
    })
    .then(({ data }) => {
      commit("setLoading", false);
      //console.log(data);
      commit("setProductsByShopId", data.getProductsByShopId);
    })
    .catch(err => {
      commit("setLoading", false);
      console.error(err);
    });
};
export const getProductByProductId = ({ commit }, payload) => {
  commit("setLoading", true);
  apolloClient
    .query({
      query: GET_PRODUCT_BY_PRODUCT_ID,
      variables: payload
    })
    .then(({ data }) => {
      commit("setLoading", false);
      console.log(data);
      commit("setProductByProductId", data.getProductByProductId);
    })
    .catch(err => {
      commit("setLoading", false);
      console.error(err);
    });
};

export const getAllProducts = ({ commit }) => {
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
};

export const addProduct = ({ commit }, payload) => {
  commit("setLoading", true);

  apolloClient
    .mutate({
      mutation: ADD_PRODUCT,
      variables: payload,
      update: (cache, { data: { addProduct } }) => {
        // first read the query
        console.log(cache);
        const data = cache.readQuery({
          query: GET_PRODUCT_BY_SHOPID,
          variables: payload
        });
        //create updated data
        data.getProductsByShopId.unshift(addProduct);
        // write updated data back to query
        cache.writeQuery({
          query: GET_PRODUCT_BY_SHOPID,
          variables: payload,
          data
        });
      },
      optimisticResponse: {
        __typename: "Mutation",
        addProduct: {
          __typename: "Product",
          _id: -1,
          ...payload
        }
      }
    })
    .then(({ data }) => {
      commit("setLoading", false);
      commit("toggleAddProductDailog");
    })
    .catch(err => {
      commit("setLoading", false);
      console.error(err);
    });
};

export const updateProductRating = ({ commit }, payload) => {
  commit("setLoading", true);
  apolloClient
    .mutate({
      mutation: UPDATE_PRODUCT_RATING,
      variables: payload
    })
    .then(({ data }) => {
      console.log(data);
      commit("setLoading", false);
    })
    .catch(err => {
      commit("setLoading", false);
      console.error(err);
    });
};

export const getOwnProductRating = ({ commit }, payload) => {
  commit("setLoading", true);
  apolloClient
    .query({
      query: GET_OWN_PRODUCT_RATING,
      variables: payload
    })
    .then(({ data }) => {
      commit("setLoading", false);
      console.log(data);
      commit("setOwnProductRating", data.getOwnProductRating);
    })
    .catch(err => {
      commit("setLoading", false);
    });
};
