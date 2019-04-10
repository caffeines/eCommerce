import { gql } from "apollo-boost";

//* get all products
export const GET_PRODUCTS = gql`
  query {
    getProducts {
      _id
      productName
      price
      picture
      createdBy {
        _id
        shopName
      }
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

export const DELETE_PRODUCT_BY_ID = gql`
  mutation($id: String!) {
    deleteProduct(id: $id) {
      _id
      productName
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
