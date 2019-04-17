const express = require("express");
const consola = require("consola");
const { ApolloServer, AuthenticationError } = require("apollo-server");
const mongoose = require("mongoose");
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
const Order = require("./models/Order");

require("dotenv").config({ path: "variables.env" });
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
});
mongoose.connection
  // @ts-ignore
  .once("open", () =>
    consola.info({
      message: `mongoDB connected successfully...`,
      badge: true
    })
  )
  .on("error", err => {
    throw err;
  });

//* verify JWT token passed from the client
const getUser = async token => {
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
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
  // @ts-ignore
  formatError: error => ({ name: error.name, message: error.message }),
  context: async ({ req }) => {
    const token = req.headers["authorization"];
    return {
      User,
      Product,
      Shop,
      Order,
      currentUser: await getUser(token)
    };
  },
  introspection: true,
  playground: true
});

server.listen({ port: 3000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
