/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateSessionDataById = /* GraphQL */ `
  subscription OnUpdateSessionDataById($id: String!) {
    onUpdateSessionDataById(id: $id) {
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
export const onCreateSessionData = /* GraphQL */ `
  subscription OnCreateSessionData {
    onCreateSessionData {
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
export const onUpdateSessionData = /* GraphQL */ `
  subscription OnUpdateSessionData {
    onUpdateSessionData {
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
export const onDeleteSessionData = /* GraphQL */ `
  subscription OnDeleteSessionData {
    onDeleteSessionData {
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
