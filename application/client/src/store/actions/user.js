import { defaultClient as apolloClient } from "../../main";
import router from "../../router";
import { SIGNIN_USER, GET_CURRENT_USER, SIGNUP_USER } from "../../queries/user";

export const signoutUser = async ({ commit }) => {
  commit("clearUser");
  // remove token storage in localstorage
  localStorage.setItem("token", "");
  // end session
  await apolloClient.resetStore();
  // redirect to home
  router.push("/");
  // @ts-ignore
  router.go();
};

export const getCurrentUser = ({ commit }) => {
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
      //console.error(err);
      commit("setLoading", false);
    });
};

export const signinUser = ({ commit }, payload) => {
  commit("setError", null);
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
      //console.error(err);
    });
};

export const signupUser = ({ commit }, payload) => {
  commit("setError", null);
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
      //console.error(err);
    });
};
