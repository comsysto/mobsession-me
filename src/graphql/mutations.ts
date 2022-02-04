/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSessionData = /* GraphQL */ `
  mutation CreateSessionData(
    $input: CreateSessionDataInput!
    $condition: ModelSessionDataConditionInput
  ) {
    createSessionData(input: $input, condition: $condition) {
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
export const updateSessionData = /* GraphQL */ `
  mutation UpdateSessionData(
    $input: UpdateSessionDataInput!
    $condition: ModelSessionDataConditionInput
  ) {
    updateSessionData(input: $input, condition: $condition) {
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
export const deleteSessionData = /* GraphQL */ `
  mutation DeleteSessionData(
    $input: DeleteSessionDataInput!
    $condition: ModelSessionDataConditionInput
  ) {
    deleteSessionData(input: $input, condition: $condition) {
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
