/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSessionDataInput = {
  id: string,
  intervalInMinutes: number,
  participants?: Array< ParticipantDataInput | null > | null,
  expiresAt?: number | null,
  timerEvents?: Array< TimerEventDataInput | null > | null,
};

export type ParticipantDataInput = {
  id: string,
  name: string,
  role?: ParticipantRoleData | null,
};

export enum ParticipantRoleData {
  DRIVER = "DRIVER",
  NAVIGATOR = "NAVIGATOR",
}


export type TimerEventDataInput = {
  type?: TimerEventTypeData | null,
  timestampSeconds: number,
};

export enum TimerEventTypeData {
  START = "START",
  PAUSE = "PAUSE",
}


export type ModelSessionDataConditionInput = {
  intervalInMinutes?: ModelIntInput | null,
  expiresAt?: ModelIntInput | null,
  and?: Array< ModelSessionDataConditionInput | null > | null,
  or?: Array< ModelSessionDataConditionInput | null > | null,
  not?: ModelSessionDataConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type SessionData = {
  __typename: "SessionData",
  id: string,
  intervalInMinutes: number,
  participants?:  Array<ParticipantData | null > | null,
  expiresAt?: number | null,
  timerEvents?:  Array<TimerEventData | null > | null,
  createdAt: string,
  updatedAt: string,
};

export type ParticipantData = {
  __typename: "ParticipantData",
  id: string,
  name: string,
  role?: ParticipantRoleData | null,
};

export type TimerEventData = {
  __typename: "TimerEventData",
  type?: TimerEventTypeData | null,
  timestampSeconds: number,
};

export type UpdateSessionDataInput = {
  id: string,
  intervalInMinutes?: number | null,
  participants?: Array< ParticipantDataInput | null > | null,
  expiresAt?: number | null,
  timerEvents?: Array< TimerEventDataInput | null > | null,
};

export type DeleteSessionDataInput = {
  id: string,
};

export type ModelSessionDataFilterInput = {
  id?: ModelStringInput | null,
  intervalInMinutes?: ModelIntInput | null,
  expiresAt?: ModelIntInput | null,
  and?: Array< ModelSessionDataFilterInput | null > | null,
  or?: Array< ModelSessionDataFilterInput | null > | null,
  not?: ModelSessionDataFilterInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelSessionDataConnection = {
  __typename: "ModelSessionDataConnection",
  items?:  Array<SessionData | null > | null,
  nextToken?: string | null,
};

export type CreateSessionDataMutationVariables = {
  input: CreateSessionDataInput,
  condition?: ModelSessionDataConditionInput | null,
};

export type CreateSessionDataMutation = {
  createSessionData?:  {
    __typename: "SessionData",
    id: string,
    intervalInMinutes: number,
    participants?:  Array< {
      __typename: "ParticipantData",
      id: string,
      name: string,
      role?: ParticipantRoleData | null,
    } | null > | null,
    expiresAt?: number | null,
    timerEvents?:  Array< {
      __typename: "TimerEventData",
      type?: TimerEventTypeData | null,
      timestampSeconds: number,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSessionDataMutationVariables = {
  input: UpdateSessionDataInput,
  condition?: ModelSessionDataConditionInput | null,
};

export type UpdateSessionDataMutation = {
  updateSessionData?:  {
    __typename: "SessionData",
    id: string,
    intervalInMinutes: number,
    participants?:  Array< {
      __typename: "ParticipantData",
      id: string,
      name: string,
      role?: ParticipantRoleData | null,
    } | null > | null,
    expiresAt?: number | null,
    timerEvents?:  Array< {
      __typename: "TimerEventData",
      type?: TimerEventTypeData | null,
      timestampSeconds: number,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSessionDataMutationVariables = {
  input: DeleteSessionDataInput,
  condition?: ModelSessionDataConditionInput | null,
};

export type DeleteSessionDataMutation = {
  deleteSessionData?:  {
    __typename: "SessionData",
    id: string,
    intervalInMinutes: number,
    participants?:  Array< {
      __typename: "ParticipantData",
      id: string,
      name: string,
      role?: ParticipantRoleData | null,
    } | null > | null,
    expiresAt?: number | null,
    timerEvents?:  Array< {
      __typename: "TimerEventData",
      type?: TimerEventTypeData | null,
      timestampSeconds: number,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetSessionDataQueryVariables = {
  id: string,
};

export type GetSessionDataQuery = {
  getSessionData?:  {
    __typename: "SessionData",
    id: string,
    intervalInMinutes: number,
    participants?:  Array< {
      __typename: "ParticipantData",
      id: string,
      name: string,
      role?: ParticipantRoleData | null,
    } | null > | null,
    expiresAt?: number | null,
    timerEvents?:  Array< {
      __typename: "TimerEventData",
      type?: TimerEventTypeData | null,
      timestampSeconds: number,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSessionDatasQueryVariables = {
  filter?: ModelSessionDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSessionDatasQuery = {
  listSessionDatas?:  {
    __typename: "ModelSessionDataConnection",
    items?:  Array< {
      __typename: "SessionData",
      id: string,
      intervalInMinutes: number,
      expiresAt?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnUpdateSessionDataByIdSubscriptionVariables = {
  id: string,
};

export type OnUpdateSessionDataByIdSubscription = {
  onUpdateSessionDataById?:  {
    __typename: "SessionData",
    id: string,
    intervalInMinutes: number,
    participants?:  Array< {
      __typename: "ParticipantData",
      id: string,
      name: string,
      role?: ParticipantRoleData | null,
    } | null > | null,
    expiresAt?: number | null,
    timerEvents?:  Array< {
      __typename: "TimerEventData",
      type?: TimerEventTypeData | null,
      timestampSeconds: number,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSessionDataSubscription = {
  onCreateSessionData?:  {
    __typename: "SessionData",
    id: string,
    intervalInMinutes: number,
    participants?:  Array< {
      __typename: "ParticipantData",
      id: string,
      name: string,
      role?: ParticipantRoleData | null,
    } | null > | null,
    expiresAt?: number | null,
    timerEvents?:  Array< {
      __typename: "TimerEventData",
      type?: TimerEventTypeData | null,
      timestampSeconds: number,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSessionDataSubscription = {
  onUpdateSessionData?:  {
    __typename: "SessionData",
    id: string,
    intervalInMinutes: number,
    participants?:  Array< {
      __typename: "ParticipantData",
      id: string,
      name: string,
      role?: ParticipantRoleData | null,
    } | null > | null,
    expiresAt?: number | null,
    timerEvents?:  Array< {
      __typename: "TimerEventData",
      type?: TimerEventTypeData | null,
      timestampSeconds: number,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSessionDataSubscription = {
  onDeleteSessionData?:  {
    __typename: "SessionData",
    id: string,
    intervalInMinutes: number,
    participants?:  Array< {
      __typename: "ParticipantData",
      id: string,
      name: string,
      role?: ParticipantRoleData | null,
    } | null > | null,
    expiresAt?: number | null,
    timerEvents?:  Array< {
      __typename: "TimerEventData",
      type?: TimerEventTypeData | null,
      timestampSeconds: number,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
