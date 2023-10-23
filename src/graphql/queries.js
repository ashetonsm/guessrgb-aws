/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getHistory = /* GraphQL */ `
  query GetHistory($id: ID!) {
    getHistory(id: $id) {
      id
      email
      history
      createdAt
      updatedAt
    }
  }
`;
export const listHistories = /* GraphQL */ `
  query ListHistories(
    $filter: ModelHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHistories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        history
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
