import { render } from "@testing-library/react";
import { of } from "rxjs";
import { Services } from "../../../services/ServicesContext";
import { Clock } from "../../MainPage/SessionScreen/Timer/Clock";
import { DeepPartial, TestBed } from "../TestBed";

const services: DeepPartial<Services> = {
  timerService: {
    timeComponents$: of({ sec: 0, min: 0 }),
    percent$: of(0),
    running$: of(false),
  },
};

describe("Clock Component", () => {
  test("Timer.time not equal zero", async () => {
    const component = render(
      <TestBed services={services}>
        <svg>
          <Clock />
        </svg>
      </TestBed>
    );
    await component.findByTestId("timer-text");
  });
  test("Timer.time equal zero", async () => {
    const services: DeepPartial<Services> = {
      timerService: {
        timeComponents$: of(null),
        percent$: of(0),
        running$: of(false),
      },
    };
    const component = render(
      <TestBed services={services}>
        <svg>
          <Clock />
        </svg>
      </TestBed>
    );
    const timerText = component.queryByTestId("timer-text");
    expect(timerText).not.toBeInTheDocument();
  });
});
