const express = require("express");
const consola = require("consola");
const { ApolloServer, AuthenticationError } = require("apollo-server");
const mongoose = require("mongoose");
const { conn } = require("./config/mongoDB");
const jwt = require("jsonwebtoken");
const app = express();

const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");
const resolvers = require("./resolvers");

/* Model import here */
const User = require("./models/User");
const Product = require("./models/Product");
const Shop = require("./models/Shop");

//* verify JWT token passed from the client

const getUser = async token => {
  if (token) {
    try {
      return await jwt.verify(token, "sadasas");
    } catch (error) {
      throw new AuthenticationError(
        "Your session has ended. Please sign in again"
      );
    }
  }
};

const server = new ApolloServer({
  // @ts-ignore
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers["authorization"];
    return {
      User,
      Product,
      Shop,
      currentUser: await getUser(token)
    };
  }
});

server.listen().then(({ url }) => {
  // @ts-ignore
  consola.ready({
    message: `Server listening on ${url}`,
    badge: true
  });
});
