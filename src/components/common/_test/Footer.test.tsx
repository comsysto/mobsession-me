import { render } from "@testing-library/react";
import { Footer } from "../Footer";

describe("Footer Component", () => {
  let originalOpen: typeof global.open | null = null;

  beforeEach(() => {
    originalOpen = global.open;
    global.open = jest.fn();
  });

  afterEach(() => {
    if (originalOpen) {
      global.open = originalOpen;
    }
  });

  describe("nav", () => {
    describe("with love", () => {
      test("should contain with <3 from Munich remark", async () => {
        const component = render(<Footer />);
        expect(await component.findByTestId("with-love-item")).toBeTruthy();
      });

      test("should display a font-awesome heart icon", async () => {
        const component = render(<Footer />);
        const heartItem = await component.findByTestId("with-love-item");
        expect(heartItem.querySelector(".fas")?.classList).toContain("fa-heart");
      });

      test("should contain a link to the comsysto homepage which opens in a new tab", async () => {
        const component = render(<Footer />);
        const heartItem = await component.findByTestId("with-love-item");
        const munichLink = heartItem.querySelector("a");

        expect(munichLink?.href).toEqual("https://www.comsystoreply.de/");
        expect(munichLink?.getAttribute("target")).toEqual("_blank");
      });
    });
  });
});
