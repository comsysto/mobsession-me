import { of } from "rxjs";
import { Session } from "../../domain/Session";
import { SessionService } from "../SessionService";

const mockSessionId = "big-black-donkey";
const mockSession = new Session(mockSessionId, 600, [], []);
class SessionRepositoryMock {
  constructor() {}
  session$ = of(mockSession);
  loadOrCreateSession = jest.fn();
  updateSession = jest.fn(() => mockSession);
  resetSession = jest.fn();
}

class StorageServiceMock {
  constructor() {}
  participantId = "1";
  username = "John Doe";
  sessionid = mockSessionId;
  updateParticipantId = jest.fn();
  participantId$ = jest.fn().mockReturnValue(of(this.participantId));
  updateUsername = jest.fn();
  updateSessionId = jest.fn();
}

describe("SessionService", () => {
  describe("createOrJoinSession", () => {
    it("creates a session if none exists", done => {
      const mockSessionRepository = new SessionRepositoryMock();
      const mockStorageService = new StorageServiceMock();

      const service = new SessionService(mockSessionRepository as any, mockStorageService as any);
      (service as any).sessionIdValid$ = of(true);
      (service as any).usernameValid$ = of(true);
      (service as any).sessionId$ = of(mockStorageService.sessionid);
      (service as any).username$ = of(mockStorageService.username);
      (service as any).joined$ = of(true);

      jest.spyOn(service as any, "generateSessionId").mockImplementation(() => mockSessionId);

      service.createOrJoinSession().subscribe(() => {
        expect(mockSessionRepository.loadOrCreateSession).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});
