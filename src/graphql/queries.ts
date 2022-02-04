/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSessionData = /* GraphQL */ `
  query GetSessionData($id: ID!) {
    getSessionData(id: $id) {
      id
      intervalInMinutes
      participants {
        id
        name
        role
      }
      expiresAt
      timerEvents {
        type
        timestampSeconds
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSessionDatas = /* GraphQL */ `
  query ListSessionDatas(
    $filter: ModelSessionDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessionDatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        intervalInMinutes
        expiresAt
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
