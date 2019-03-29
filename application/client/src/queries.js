import { gql } from "apollo-boost";
export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signin(userName: $username, password: $password) {
      token
    }
  }
`;
