import { findByTestId, render } from "@testing-library/react";
import { of } from "rxjs";
import { Services } from "../../../services/ServicesContext";
import { ClockControls } from "../../MainPage/SessionScreen/Timer/ClockControls";
import { DeepPartial, TestBed } from "../TestBed";
import userEvent from "@testing-library/user-event";

describe("ClockControls Component", () => {
  test("stop button", async () => {
    const pauseMock = jest.fn();

    const services: DeepPartial<Services> = {
      timerService: {
        running$: of(true),
        pause: pauseMock,
      },
    };
    const component = render(
      <TestBed services={services}>
        <svg>
          <ClockControls />
        </svg>
      </TestBed>
    );
    const stopIcon = await component.findByTestId("stop-icon");
    userEvent.click(stopIcon);
    expect(pauseMock).toHaveBeenCalled();
  });
  test("start button", async () => {
    const startMock = jest.fn();

    const services: DeepPartial<Services> = {
      timerService: {
        running$: of(false),
        start: startMock,
      },
    };
    const component = render(
      <TestBed services={services}>
        <svg>
          <ClockControls />
        </svg>
      </TestBed>
    );
    const startIcon = await component.findByTestId("play-icon");
    userEvent.click(startIcon);
    expect(startMock).toHaveBeenCalled();
  });
  test("reset button", async () => {
    const resetMock = jest.fn();

    const services: DeepPartial<Services> = {
      timerService: {
        running$: of(false),
        reset: resetMock,
      },
    };
    const component = render(
      <TestBed services={services}>
        <svg>
          <ClockControls />
        </svg>
      </TestBed>
    );
    const resetIcon = await component.findByTestId("reset-icon");
    userEvent.click(resetIcon);
    expect(resetMock).toHaveBeenCalled();
  });
});
