import { render } from "@testing-library/react";
import { GeneralControls } from "../../MainPage/SessionScreen/Timer/GeneralControls";
import { of } from "rxjs";
import { DeepPartial, TestBed } from "../TestBed";
import { Services } from "../../../services/ServicesContext";
import userEvent from "@testing-library/user-event";

const services: DeepPartial<Services> = {
  speechService: {
    muted$: of(false),
  },
  fullscreenService: {
    fullscreen$: of(false),
    enter: jest.fn(),
  },
  timerService: {
    running$: of(false),
  },
  mobSessionService: {
    updateRemoveMe: jest.fn(),
  },
  copyService: {
    copy: jest.fn(),
  },
};

describe("GeneralControls Component", () => {
  test("enter fullscreen", async () => {
    const component = render(
      <TestBed services={services}>
        <svg>
          <GeneralControls x={0} y={0} />
        </svg>
      </TestBed>
    );
    const fullscreenIcon = await component.findByTestId("fullscreen-icon");
    userEvent.click(fullscreenIcon);
    expect(services.fullscreenService?.enter).toHaveBeenCalled();
  });
  test("exit fullscreen", async () => {
    const exitMock = jest.fn();
    const services: DeepPartial<Services> = {
      speechService: {
        muted$: of(false),
      },
      fullscreenService: {
        fullscreen$: of(true),
        exit: exitMock,
      },
      timerService: {
        running$: of(false),
      },
    };
    const component = render(
      <TestBed services={services}>
        <svg>
          <GeneralControls x={0} y={0} />
        </svg>
      </TestBed>
    );
    const fullscreenIcon = await component.findByTestId("fullscreen-icon");
    userEvent.click(fullscreenIcon);
    expect(exitMock).toHaveBeenCalled();
  });
  test("unmute button", async () => {
    const muteMock = jest.fn();
    const services: DeepPartial<Services> = {
      speechService: {
        muted$: of(false),
        mute: muteMock,
      },
      fullscreenService: {
        fullscreen$: of(false),
      },
      timerService: {
        running$: of(false),
      },
    };
    const component = render(
      <TestBed services={services}>
        <svg>
          <GeneralControls x={0} y={0} />
        </svg>
      </TestBed>
    );
    const unmuteIcon = await component.findByTestId("unmute-icon");
    userEvent.click(unmuteIcon);
    expect(muteMock).toHaveBeenCalled();
  });
  test("mute button", async () => {
    const unmuteMock = jest.fn();
    const services: DeepPartial<Services> = {
      speechService: {
        muted$: of(true),
        unmute: unmuteMock,
      },
      fullscreenService: {
        fullscreen$: of(false),
      },
      timerService: {
        running$: of(false),
      },
    };
    const component = render(
      <TestBed services={services}>
        <svg>
          <GeneralControls x={0} y={0} />
        </svg>
      </TestBed>
    );
    const muteIcon = await component.findByTestId("mute-icon");
    userEvent.click(muteIcon);
    expect(unmuteMock).toHaveBeenCalled();
  });
  test("leave session", async () => {
    const component = render(
      <TestBed services={services}>
        <svg>
          <GeneralControls x={0} y={0} />
        </svg>
      </TestBed>
    );
    const leaveIcon = await component.findByTestId("leave-icon");
    userEvent.click(leaveIcon);
    expect(services.mobSessionService?.updateRemoveMe).toHaveBeenCalled();
  });
  test("copy button", async () => {
    const component = render(
      <TestBed services={services}>
        <svg>
          <GeneralControls x={0} y={0} />
        </svg>
      </TestBed>
    );
    const leaveIcon = await component.findByTestId("clipboard-icon");
    userEvent.click(leaveIcon);
    expect(services.copyService?.copy).toHaveBeenCalled();
  });
});
