import { defaultClient as apolloClient } from "../../main";
import router from "../../router";
import { ADD_ORDER, GET_ORDER } from "../../queries/order";
export const addOrder = ({ commit }, payload) => {
  commit("setLoading", true);

  apolloClient
    .mutate({
      mutation: ADD_ORDER,
      variables: payload,
      update: (cache, { data: { addOrder } }) => {
        // first read the query
        console.log(cache);
        const data = cache.readQuery({
          query: GET_ORDER,
          variables: payload
        });
        //create updated data
        data.getOrder.unshift(addOrder);
        // write updated data back to query
        cache.writeQuery({
          query: GET_ORDER,
          variables: payload,
          data
        });
      },
      optimisticResponse: {
        __typename: "Mutation",
        addOrder: {
          __typename: "Order",
          _id: -1,
          ...payload
        }
      }
    })
    .then(({ data }) => {
      commit("setLoading", false);
      console.log("data.addOrder", data.addOrder);
    })
    .catch(err => {
      commit("setLoading", false);
      console.error(err);
    });
};

export const getOrder = ({ commit }) => {
  commit("setLoading", true);

  apolloClient
    .query({
      query: GET_ORDER
    })
    .then(({ data }) => {
      commit("setOrder", data.getOrder);
      commit("setLoading", false);
      console.log("data.getOrder: ", data.getOrder);
    })
    .catch(err => {
      commit("setLoading", false);
      console.error(err);
    });
};
