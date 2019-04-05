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
  ) {
    createShop(
      shopName: $shopName
      ownerId: $ownerId
      email: $email
      contactNo: $contactNo
      address: $address
    ) {
      _id
      shopName
      email
      shopId
      contactNo
      address
      logo
      rating
      dateOfCreation
      owner {
        _id
      }
    }
  }
`;

//* Get shop (single)
export const GET_SHOP = gql`
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
