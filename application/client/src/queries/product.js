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
      rating {
        rate
        totalNumberOfRating
      }
    }
  }
`;

//* Infinite scroll

export const INFINITE_SCROLL_PRODUCT = gql`
  query($pageNum: Int!, $pageSize: Int!) {
    infiniteScrollProduct(pageNum: $pageNum, pageSize: $pageSize) {
      hasMore
      products {
        _id
        productName
        price
        picture
        createdBy {
          _id
          shopName
        }
      }
      rating {
        rate
        totalNumberOfRating
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
      rating {
        rate
        totalNumberOfRating
      }
      color
      category
      tag
      picture
    }
  }
`;

export const GET_PRODUCT_BY_PRODUCT_ID = gql`
  query($id: String!) {
    getProductByProductId(id: $id) {
      _id
      productName
      price
      description
      comments {
        _id
        body
        commentUser {
          _id
          firstName
          lastName
          profilePic
        }
        commentDate
        like
      }
      rating {
        rate
        totalNumberOfRating
      }
      tag
      category
      size
      color
      parent
      discountPrice
      picture
      shopId
      love
      createdBy {
        _id
        shopName
        logo
      }
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

//* add comment

export const ADD_PRODUCT_COMMENT = gql`
  mutation($body: String, $userId: ID, $productId: ID) {
    addComment(body: $body, userId: $userId, productId: $productId) {
      _id
      body
      commentUser {
        _id
        firstName
        lastName
        profilePic
      }
      commentDate
    }
  }
`;

//* Love product

export const LOVE_PRODUCT = gql`
  mutation($productId: ID!, $userName: String!) {
    loveProduct(productId: $productId, userName: $userName) {
      loves
      wishList {
        _id
        productName
        price
        picture
      }
    }
  }
`;

export const UNLOVE_PRODUCT = gql`
  mutation($productId: ID!, $userName: String!) {
    unLoveProduct(productId: $productId, userName: $userName) {
      loves
      wishList {
        _id
        productName
        price
        picture
      }
    }
  }
`;

//* Searh anything
export const SEARCH = gql`
  query($any: String) {
    searchAny(any: $any) {
      product {
        _id
        productName
        picture
      }
      shop {
        _id
        shopName
        shopId
        logo
      }
      user {
        _id
        userName
        firstName
        lastName
        profilePic
      }
    }
  }
`;

export const UPDATE_PRODUCT_RATING = gql`
  mutation($productId: ID!, $userId: ID!, $givenRating: Float) {
    updateProductRating(
      productId: $productId
      userId: $userId
      givenRating: $givenRating
    ) {
      _id
      productName
      rating {
        rate
        totalNumberOfRating
      }
    }
  }
`;
