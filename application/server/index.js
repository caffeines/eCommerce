const express = require( "express" );
const consola = require( "consola" );
const {
  ApolloServer
} = require( "apollo-server" );
const mongoose = require( 'mongoose' );
const {
  conn
} = require( './config/mongoDB' );
const app = express();

const fs = require( 'fs' );
const path = require( 'path' );
const filePath = path.join( __dirname, 'typeDefs.gql' );
const typeDefs = fs.readFileSync( filePath, "utf-8" );
const resolvers = require( './resolvers' );

/* Model import here */
const User = require( './models/User' );
const Product = require( './models/Product' );
const Shop = require( './models/Shop' );


const server = new ApolloServer( {
  // @ts-ignore
  typeDefs,
  resolvers,
  context: {
    User,
    Product,
    Shop
  }
} );

server.listen().then( ( {
  url
} ) => {
  // @ts-ignore
  consola.ready( {
    message: `Server listening on ${url}`,
    badge: true
  } );
} );
