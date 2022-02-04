import { FullscreenService } from "../FullscreenService";

describe("FullscreenService", () => {
  let service: FullscreenService;

  beforeEach(() => {
    service = new FullscreenService();
  });

  it("sets full screen mode state to a default value of false", done => {
    service.fullscreen$.subscribe(isFullscreenModeActive => {
      expect(isFullscreenModeActive).toEqual(false);
      done();
    });
  });

  describe("enter", () => {
    it("sets fullscreen mode state to true", done => {
      service.enter();
      service.fullscreen$.subscribe(isFullscreenModeActive => {
        expect(isFullscreenModeActive).toEqual(true);
        done();
      });
    });
  });

  describe("exit", () => {
    it("sets fullscreen mode state to false", done => {
      service.enter();
      service.fullscreen$.subscribe(isFullscreenModeActive => {
        expect(isFullscreenModeActive).toEqual(true);
        done();
      });

      service.exit();
      service.fullscreen$.subscribe(isFullscreenModeActive => {
        expect(isFullscreenModeActive).toEqual(false);
        done();
      });
    });
  });
});
