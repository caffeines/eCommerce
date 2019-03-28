import Vue from 'vue'
import Vuex from 'vuex'
import {
  defaultClient as apolloClient
} from './main'
Vue.use( Vuex )
import {
  gql
} from 'apollo-boost'
import {
  STATES
} from 'mongoose';

export default new Vuex.Store( {
  state: {
    products: [],
    loading: false
  },
  mutations: {
    setProducts: ( state, payload ) => {
      state.products = payload;
    },
    setLoading: ( state, payload ) => {
      state.loading = payload;
    }
  },
  actions: {
    getAllProducts: ( {
      commit
    } ) => {
      commit( 'setLoading', true );
      apolloClient
        .query( {
          query: gql `
          query{
            getProducts {
              _id
              productName
              price
              picture
            }
          }
          `
        } ).then( ( {
          data
        } ) => {
          commit( 'setProducts', data.getProducts );
          commit( 'setLoading', false );
        } ).catch( err => {
          commit( 'setLoading', false );
          console.error( err );
        } )
    }
  },
  getters: {
    getProducts: state => state.products,
    loading: state => state.loading
  }
} )