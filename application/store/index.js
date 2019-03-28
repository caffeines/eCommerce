import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store( {
    state: {
      products: 15456
    },
    mutations: {
      setProducts( state, products ) {
        state.products = products
      }
    },
    actions: {
      setProducts( VuexContext, products ) {
        VuexContext.commit( 'setProducts', products )

      }
    },
    getters: {
      getProducts( state ) {
        return state.products
      }
    }
  } );
};

export default createStore;

/* 
let client = this.app.apolloProvider.defaultClient;
client.query( {
      query: gql `
                    query {
                        getProducts {
                            picture
                            productName
                            price
                        }
                    }
                
                `
                } ).then( data => {
                  console.log( data );
                } ).catch( err => {
                  console.error( err );
                } )
                */
