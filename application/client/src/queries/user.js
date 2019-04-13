import { gql } from "apollo-boost";

//* Signin user
export const SIGNIN_USER = gql`
  mutation($userName: String, $password: String!) {
    signin(userName: $userName, password: $password) {
      token
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
      ratedProduct {
        rate
        totalNumberOfRating
        ratedProduct {
          rating
          product {
            _id
            productName
          }
        }
      }
      ratedShop {
        rate
        totalNumberOfRating
        ratedShop {
          rating
          shop {
            _id
            shopName
          }
        }
      }
    }
  }
`;
