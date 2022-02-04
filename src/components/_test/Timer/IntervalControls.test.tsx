import { findByTestId, render } from "@testing-library/react";
import { IntervalControls } from "../../MainPage/SessionScreen/Timer/IntervalControls";
import { TestBed, DeepPartial } from "../TestBed";
import { Services } from "../../../services/ServicesContext";
import userEvent from "@testing-library/user-event";

const services: DeepPartial<Services> = {
  mobSessionService: {
    updateTimerInterval: jest.fn().mockImplementation(val => val),
  },
};

describe("IntervalControls Component", () => {
  test("popup background", async () => {
    const component = render(
      <TestBed services={services}>
        <svg>
          <IntervalControls />
        </svg>
      </TestBed>
    );
    const timerIcon = await component.findByTestId("timer-icon");
    expect(component.queryByTestId("interval-background")).not.toBeInTheDocument();
    userEvent.click(timerIcon);
    await component.findByTestId("interval-background");
  });
  test("set-interval button", async () => {
    const component = render(
      <TestBed services={services}>
        <svg>
          <IntervalControls />
        </svg>
      </TestBed>
    );
    const timerIcon = await component.findByTestId("timer-icon");
    userEvent.click(timerIcon);
    const button_10 = await component.findByTestId("button-10");
    userEvent.click(button_10);
    expect(services.mobSessionService?.updateTimerInterval).toHaveBeenCalledWith(10 * 60);
  });
});
