import { render } from "@testing-library/react";
import { LandingScreenContent } from "../MainPage/LandingScreen/LandingScreenContent";
import { TestBed } from "./TestBed";

describe("LandingScreenContent Component", () => {
  test("render component", async () => {
    const children = <div>children</div>;
    const component = render(
      <TestBed>
        <LandingScreenContent>{children}</LandingScreenContent>
      </TestBed>
    );
    await component.findByText("children");
  });
});
