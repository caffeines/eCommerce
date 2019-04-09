import { gql } from "apollo-boost";
import { Query } from "mongoose";

//* Signin user
export const SIGNIN_USER = gql`
  mutation($userName: String, $password: String!) {
    signin(userName: $userName, password: $password) {
      token
    }
  }
`;

//* get products
export const GET_PRODUCTS = gql`
  query {
    getProducts {
      _id
      productName
      price
      picture
    }
  }
`;

// get product by shopId
export const GET_PRODUCT_BY_SHOPID = gql`
  query($shopId: String!) {
    getProductsByShopId(id: $shopId) {
      _id
      productName
      price
      size
      description
      rating
      color
      category
      tag
      picture
    }
  }
`;

//* Signup user

export const SIGNUP_USER = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $contactNo: String!
    $email: String!
    $password: String!
    $userName: String
    $dateOfBirth: String
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      contactNo: $contactNo
      email: $email
      password: $password
      userName: $userName
      dateOfBirth: $dateOfBirth
    ) {
      token
    }
  }
`;

//* Get current user
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      firstName
      lastName
      email
      contactNo
      password
      userName
      dateOfBirth
      dateOfRegistration
      profilePic
      coverPic
      role
      love {
        _id
        productName
        price
        picture
      }
    }
  }
`;

//* create shop
export const CREATE_SHOP = gql`
  mutation(
    $shopName: String!
    $ownerId: ID!
    $email: String!
    $contactNo: String!
    $address: String!
    $ownerEmail: String!
  ) {
    createShop(
      shopName: $shopName
      ownerId: $ownerId
      email: $email
      contactNo: $contactNo
      address: $address
      ownerEmail: $ownerEmail
    ) {
      _id
      shopName
      email
      shopId
      contactNo
      address
      ownerEmail
      logo
      rating
      dateOfCreation
      owner {
        _id
      }
    }
  }
`;

//* Get shop by shopid (single)
export const GET_SHOP_BY_SHOP_ID = gql`
  query($id: String!) {
    getShop(id: $id) {
      _id
      shopName
      address
      owner {
        _id
        firstName
        lastName
        userName
        profilePic
      }
      contactNo
      address
      shopId
      logo
      coverPic {
        _id
        src
        head
        shortDescription
      }
      dateOfCreation
      rating
      kudos {
        _id
        name
        description
        year
      }
    }
  }
`;

//* Get shop for a single usser
export const GET_ALL_SHOP_BY_A_USER = gql`
  query($id: String!) {
    getAllShopByaUser(id: $id) {
      _id
      shopName
      address
      owner {
        _id
        firstName
        lastName
        userName
        profilePic
      }
      contactNo
      address
      shopId
      logo
      coverPic {
        _id
        src
        head
        shortDescription
      }
      dateOfCreation
      rating
      kudos {
        _id
        name
        description
        year
      }
    }
  }
`;

//* Add product
export const ADD_PRODUCT = gql`
  mutation(
    $productName: String!
    $price: Int!
    $description: String!
    $tag: [String]!
    $category: [String]!
    $size: [String]!
    $color: [String]!
    $parent: String
    $picture: [String]!
    $creatorId: ID!
    $shopId: String!
  ) {
    addProduct(
      productName: $productName
      price: $price
      description: $description
      tag: $tag
      category: $category
      size: $size
      color: $color
      parent: $parent
      picture: $picture
      creatorId: $creatorId
      shopId: $shopId
    ) {
      _id
      price
      description
      tag
      category
      size
      color
      picture
      parent
      createdBy {
        _id
      }
    }
  }
`;
