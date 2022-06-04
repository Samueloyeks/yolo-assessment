import {  gql } from "@apollo/client";

const CRYPTO_PRICES_QUERY = gql`
  query getPrices($currency : String!) {
    markets(
      filter: { baseSymbol: { _eq: $currency }, quoteSymbol: { _eq: "EUR" } }
    ) {
      id
      ticker {
        lastPrice
      }
    }
  }
`;


export default CRYPTO_PRICES_QUERY;