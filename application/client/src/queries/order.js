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
