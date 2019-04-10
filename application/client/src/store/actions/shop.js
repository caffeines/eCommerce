import { defaultClient as apolloClient } from "../../main";
import router from "../../router";

import {
  CREATE_SHOP,
  GET_ALL_SHOP_BY_A_USER,
  GET_SHOP_BY_SHOP_ID
} from "../../queries/shop";

export const pictureSetter = ({ commit }, payload) => {
  commit("setPicture", payload);
};

//* get shop by a shop id
export const getShop = ({ commit }, payload) => {
  commit("setLoading", true);
  apolloClient
    .query({
      query: GET_SHOP_BY_SHOP_ID,
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
};

export const getAllShopByaUser = ({ commit }, payload) => {
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
};

export const setCurrentShopName = ({ commit }, payload) => {
  console.log(payload);
  commit("setcurrentShop", payload);
};

export const createShop = ({ commit }, payload) => {
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
};
