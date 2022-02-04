import { API } from "aws-amplify";
import Observable from "zen-observable-ts";
import { Session } from "../../domain/Session";
import { CreateSessionData, GraphQlClient } from "../GraphQlClient";

describe("GraphQlClient", () => {
  let data: CreateSessionData;
  let client: GraphQlClient;

  beforeEach(() => {
    data = {
      sessionId: "my-session",
      intervalInSeconds: 600,
      expiryTime: 500,
    };

    client = new GraphQlClient();
  });

  describe("createSession", () => {
    beforeEach(() => {
      // this operation type causes graphql to return a Promise
      jest.spyOn(API, "graphql").mockReturnValue(
        Promise.resolve({
          data: {
            createSessionData: {
              id: data.sessionId,
              intervalInMinutes: 10,
              participants: [],
              expiresAt: 1629883933,
              timerEvents: null,
              createdAt: "2021-08-24T09:32:13.402Z",
              updatedAt: "2021-08-24T09:32:13.402Z",
            },
          },
        })
      );
    });

    it("creates a new session and returns it as an observable", done => {
      const expectedSession = new Session(data.sessionId, data.intervalInSeconds, [], []);

      client.createSession(data).subscribe(session => {
        expect(session).toEqual(expectedSession);
        done();
      });
    });
  });

  describe("getSession", () => {
    beforeEach(() => {
      // this operation type causes graphql to return a Promise
      jest.spyOn(API, "graphql").mockReturnValue(
        Promise.resolve({
          data: {
            getSessionData: {
              id: data.sessionId,
              intervalInMinutes: 10,
              participants: [],
              expiresAt: 1629883933,
              timerEvents: null,
              createdAt: "2021-08-24T09:32:13.402Z",
              updatedAt: "2021-08-24T09:32:13.402Z",
            },
          },
        })
      );
    });

    it("returns an observable for an existing session by its session id", done => {
      const expectedSession = new Session(data.sessionId, data.intervalInSeconds, [], []);

      client.getSession(data.sessionId).subscribe(session => {
        expect(session).toEqual(expectedSession);
        done();
      });
    });
  });

  describe("subscribeSession", () => {
    beforeEach(() => {
      // this operation type causes graphql to return an observable
      jest.spyOn(API, "graphql").mockReturnValue(
        new Observable(subscriber => {
          subscriber.next({
            value: {
              data: {
                onUpdateSessionDataById: {
                  id: data.sessionId,
                  intervalInMinutes: 10,
                  participants: [],
                  expiresAt: 1629883933,
                  timerEvents: null,
                  createdAt: "2021-08-24T09:32:13.402Z",
                  updatedAt: "2021-08-24T09:32:13.402Z",
                },
              },
            },
          });
          subscriber.complete();
        })
      );
    });

    it("creates a new session and returns it as an observable", done => {
      const expectedSession = new Session(data.sessionId, data.intervalInSeconds, [], []);

      client.subscribeSession(data.sessionId).subscribe(session => {
        expect(session).toEqual(expectedSession);
        done();
      });
    });
  });

  describe("updateSession", () => {
    beforeEach(() => {
      // this operation type causes graphql to return a Promise
      jest.spyOn(API, "graphql").mockReturnValue(
        Promise.resolve({
          data: {
            updateSessionData: {
              id: "updated-session",
              intervalInMinutes: 5,
              participants: [],
              expiresAt: 1629883933,
              timerEvents: null,
              createdAt: "2021-08-24T09:32:13.402Z",
              updatedAt: "2021-08-24T09:32:13.402Z",
            },
          },
        })
      );
    });

    it("creates a new session and returns it as an observable", done => {
      const updatedSession = new Session("updated-session", 300, [], []);

      client.updateSession(updatedSession).subscribe(session => {
        expect(session).toEqual(updatedSession);
        done();
      });
    });
  });
});
