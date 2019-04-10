import { gql } from "apollo-boost";

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
