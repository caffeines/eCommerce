import { gql } from "apollo-boost";

//Todo Signin user
export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signin(userName: $username, password: $password) {
      token
    }
  }
`;

//Todo get products
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

//Todo Signup user

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
