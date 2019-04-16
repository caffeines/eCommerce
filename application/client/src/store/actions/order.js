import { defaultClient as apolloClient } from "../../main";
import router from "../../router";
import { ADD_ORDER } from "../../queries/order";
export const addOrder = ({ commit }, payload) => {
  commit("setLoading", true);

  apolloClient
    .mutate({
      mutation: ADD_ORDER,
      variables: payload
      /* update: ( cache, { data: { addProduct } } ) =>
            {
                // first read the query
                console.log( cache );
                const data = cache.readQuery( {
                    query: GET_PRODUCT_BY_SHOPID,
                    variables: payload
                } );
                //create updated data
                data.getProductsByShopId.unshift( addProduct );
                // write updated data back to query
                cache.writeQuery( {
                    query: GET_PRODUCT_BY_SHOPID,
                    variables: payload,
                    data
                } );
            },
            optimisticResponse: {
                __typename: "Mutation",
                addProduct: {
                    __typename: "Product",
                    _id: -1,
                    ...payload
                }
            } */
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
