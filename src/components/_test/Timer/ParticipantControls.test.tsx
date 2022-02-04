import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { of } from "rxjs";
import { Participant } from "../../../domain/Participant";
import { ParticipantRole } from "../../../domain/ParticipantRole";
import { Services } from "../../../services/ServicesContext";
import { ParticipantControls } from "../../MainPage/SessionScreen/Timer/ParticipantControls";
import { DeepPartial, TestBed } from "../TestBed";

const services: DeepPartial<Services> = {
  mobSessionService: {
    participants$: of([new Participant("id_1", "name_1", ParticipantRole.DRIVER)]),
    me$: of(new Participant("id_1", "name_1", ParticipantRole.DRIVER)),
    updateParticipantToNavigator: jest.fn(),
    updateParticipantToDriver: jest.fn(),
    updateRemoveParticipant: jest.fn(),
  },
};

describe("ParticipantControls Component", () => {
  test("popup background", async () => {
    const component = render(
      <TestBed services={services}>
        <svg>
          <ParticipantControls />
        </svg>
      </TestBed>
    );
    expect(component.queryByTestId("participant-background")).not.toBeInTheDocument();
    const participant = await component.findByTestId("person-icon");
    userEvent.click(participant);
    await component.findByTestId("participant-background");
  });
  test("make-to-driver button", async () => {
    const component = render(
      <TestBed services={services}>
        <svg>
          <ParticipantControls />
        </svg>
      </TestBed>
    );
    expect(component.queryByTestId("driver-icon")).not.toBeInTheDocument();
    const participant = await component.findByTestId("person-icon");
    userEvent.click(participant);
    const driverIcon = await component.findByTestId("driver-icon");
    userEvent.click(driverIcon);
    expect(services.mobSessionService?.updateParticipantToDriver).toHaveBeenCalled();
  });
  test("make-to-navigator button", async () => {
    const component = render(
      <TestBed services={services}>
        <svg>
          <ParticipantControls />
        </svg>
      </TestBed>
    );
    expect(component.queryByTestId("navigator-icon")).not.toBeInTheDocument();
    const participant = await component.findByTestId("person-icon");
    userEvent.click(participant);
    const navigatorIcon = await component.findByTestId("navigator-icon");
    userEvent.click(navigatorIcon);
    expect(services.mobSessionService?.updateParticipantToNavigator).toHaveBeenCalled();
  });
  test("leave-session button", async () => {
    const component = render(
      <TestBed services={services}>
        <svg>
          <ParticipantControls />
        </svg>
      </TestBed>
    );
    expect(component.queryByTestId("leave-icon")).not.toBeInTheDocument();
    const participant = await component.findByTestId("person-icon");
    userEvent.click(participant);
    const leaveIcon = await component.findByTestId("delete-icon");
    userEvent.click(leaveIcon);
    expect(services.mobSessionService?.updateRemoveParticipant).toHaveBeenCalled();
  });
});
