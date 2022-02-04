import { render } from "@testing-library/react";
import { SessionScreen } from "../MainPage/SessionScreen";
import { Services } from "../../services/ServicesContext";
import { DeepPartial, TestBed } from "./TestBed";
import { of } from "rxjs";

jest.mock("../MainPage/SessionScreen/Timer/Clock");
jest.mock("../MainPage/SessionScreen/Timer/ClockControls");
jest.mock("../MainPage/SessionScreen/Timer/GeneralControls");

describe("SessionScreen Component", () => {
  test("normal mode", async () => {
    const services: DeepPartial<Services> = {
      fullscreenService: {
        fullscreen$: of(false),
      },
      mobSessionService: {
        username$: of("username"),
        sessionId$: of("sessionId"),
      },
    };
    const component = render(
      <TestBed services={services}>
        <SessionScreen />
      </TestBed>
    );
    const fullscreenComponent = component.queryByTestId("fullscreen-mode");
    expect(fullscreenComponent).not.toBeInTheDocument();
  });

  test("fullscreen mode", async () => {
    const services: DeepPartial<Services> = {
      fullscreenService: {
        fullscreen$: of(true),
      },
      mobSessionService: {
        username$: of("username"),
        sessionId$: of("sessionId"),
      },
    };
    const component = render(
      <TestBed services={services}>
        <SessionScreen />
      </TestBed>
    );
    await component.findByTestId("fullscreen-mode");
  });
});
