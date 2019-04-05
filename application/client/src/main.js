import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ApolloClient from "apollo-boost";
import VueApollo, { ApolloProvider } from "vue-apollo";
import VueTyperPlugin from "vue-typer";
import { configure } from "protobufjs";

Vue.use(VueApollo);
Vue.use(VueTyperPlugin);

// configuration of apollo-client
export const defaultClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    //if no token with key of 'token' in localStorage
    if (!localStorage.token) {
      localStorage.setItem("token", "");
    }
    // operation adds the token to an autorization hedder, which is sent to backend
    operation.setContext({
      headers: {
        authorization: localStorage.getItem("token")
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log("[networkError] ", networkError);
    }
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.dir(err);
        if (err.name === "AuthenticationError") {
          // set auth error in state
          store.commit("setAuthError", err);
          //sign out user to clear token
          store.dispatch("signoutUser");
        }
      }
    }
  }
});

const apolloProvider = new VueApollo({
  defaultClient
});

Vue.config.productionTip = false;

// @ts-ignore
new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    //* perform getCurrentUser query
    this.$store.dispatch("getCurrentUser");
  }
}).$mount("#app");
