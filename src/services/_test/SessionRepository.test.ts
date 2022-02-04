import { of } from "rxjs";
import { Config } from "../../config/Config";
import { Session } from "../../domain/Session";
import { GraphQlClient } from "../GraphQlClient";
import { SessionRepository } from "../SessionRepository";

class GraphQlClientMock {
  private execute = jest.fn();
  private mapMobSessionToSession = jest.fn();

  getSession = jest.fn();
  createSession = jest.fn();
  subscribeSession = jest.fn();
  updateSession = jest.fn();
}

describe("SessionRepository", () => {
  let graphQlClient: GraphQlClientMock;
  let config: Config;
  let repository: SessionRepository;

  beforeEach(() => {
    graphQlClient = new GraphQlClientMock();
    config = new Config();
    repository = new SessionRepository(graphQlClient as unknown as GraphQlClient, config);
  });

  describe("loadOrCreateSession", () => {
    it("initializes a session id if a session id is given", done => {
      const newSessionId = "i-am-batman";
      repository.loadOrCreateSession(newSessionId);

      repository.sessionId$.subscribe(sessionId => {
        expect(sessionId).toEqual(newSessionId);
        done();
      });
    });
  });

  describe("resetSession", () => {
    it("resets the current session id", done => {
      const newSessionId = "i-am-spiderman";
      repository.loadOrCreateSession(newSessionId);

      repository.resetSession();

      repository.sessionId$.subscribe(sessionId => {
        expect(sessionId).toEqual(null);
        done();
      });
    });
  });

  describe("updateSession", () => {
    it("updates the session in the GraphQl client", () => {
      const expectedInitialSession = new Session("session", 1, [], []);
      const expectedUpdatedSession = new Session("session", 2, [], []);
      graphQlClient.getSession.mockReturnValue(of(expectedInitialSession));
      graphQlClient.subscribeSession.mockReturnValue(of());

      (repository as any).session$ = of(expectedInitialSession);

      repository.updateSession(() => expectedUpdatedSession);

      expect(graphQlClient.updateSession).toHaveBeenCalledTimes(1);
      expect(graphQlClient.updateSession).toHaveBeenLastCalledWith(expectedUpdatedSession);
    });
  });
});
