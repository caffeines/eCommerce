import { gql } from "apollo-boost";

export const ADD_ORDER = gql`
  mutation(
    $consumer: ID!
    $consumerEmail: String!
    $shippingType: String!
    $total: Int!
    $purchaseItems: [PurchaseItemInput]
    $address: AddressInput!
  ) {
    addOrder(
      consumer: $consumer
      consumerEmail: $consumerEmail
      shippingType: $shippingType
      total: $total
      purchaseItems: $purchaseItems
      address: $address
    ) {
      consumer
      purchaseItems {
        productItem
        size
        productName
      }
    }
  }
`;

export const GET_ORDER = gql`
  query {
    getOrder {
      purchaseItems {
        productItem
        productName
        size
        color
        shopId
        shopName
        quantity
        status
        price
      }
      consumer
      consumerEmail
      address {
        name
        address
        contact
        city
        state
        zip
        country
      }
      shippingType
      total
    }
  }
`;
