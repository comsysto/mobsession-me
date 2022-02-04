import { render } from "@testing-library/react";
import { Timer } from "../MainPage/SessionScreen/Timer";

jest.mock("../MainPage/SessionScreen/Timer/Clock");
jest.mock("../MainPage/SessionScreen/Timer/GeneralControls");
jest.mock("../MainPage/SessionScreen/Timer/IntervalControls");
jest.mock("../MainPage/SessionScreen/Timer/ParticipantControls");
jest.mock("../MainPage/SessionScreen/Timer/ClockControls");

describe("Timer Component", () => {
  test("check rendered components", async () => {
    const component = render(
      <svg>
        <Timer />
      </svg>
    );

    await component.findByTestId("clock");
    await component.findByTestId("clock-controls");
    await component.findByTestId("general-controls");
    await component.findByTestId("interval-control");
    await component.findByTestId("participant-controls");
  });
});
