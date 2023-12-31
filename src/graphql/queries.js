/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      email
      status
      date
      guesses
      answer
      difficulty
      createdAt
      updatedAt
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        status
        date
        guesses
        answer
        difficulty
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const gameByEmail = /* GraphQL */ `
  query GameByEmail(
    $email: String!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gameByEmail(
      email: $email
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        status
        date
        guesses
        answer
        difficulty
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
