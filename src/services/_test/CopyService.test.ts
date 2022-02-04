import { CopyService } from "../CopyService";

describe("CopyService", () => {
  describe("copyUrl", () => {
    it("copies a given url to the clipboard", () => {
      const clipboardMock: Partial<Clipboard> = {
        writeText: jest.fn(),
      };
      const copyService = new CopyService(clipboardMock as Clipboard);
      const url = "https://some.url/";
      copyService.copy(url);
      expect(clipboardMock.writeText).toHaveBeenLastCalledWith(url);
    });
  });
});
