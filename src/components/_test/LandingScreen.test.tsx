import { render } from "@testing-library/react";
import { of } from "rxjs";
import { Services } from "../../services/ServicesContext";
import { LandingScreen } from "../MainPage/LandingScreen";
import { TestBed, DeepPartial } from "./TestBed";

const services: DeepPartial<Services> = {
  copyService: {
    copy: jest.fn(),
  },
  mobSessionService: {
    username$: of("username"),
    sessionId$: of("sessionId"),
    updateSessionIdToRandom: jest.fn(),
  },
};
describe("LandingScreen Component", () => {
  test("generate sessionname button", async () => {
    const component = render(
      <TestBed services={services}>
        <LandingScreen />
      </TestBed>
    );
    const generateIdButton = await component.findByTestId("generateId-button");
    generateIdButton.click();
    expect(services.mobSessionService?.updateSessionIdToRandom).toHaveBeenCalled();
  });
  test("sessionname input", async () => {
    const component = render(
      <TestBed services={services}>
        <LandingScreen />
      </TestBed>
    );
    const sessionnameInput = await component.findByTestId("sessionname-input");
    // const expected = ("[a-z]+[-][a-z]+[-][a-z]+");
    expect(sessionnameInput.getAttribute("placeholder")).toBe("Session Name");
    expect(sessionnameInput).toHaveValue("sessionId");
  });

  test("nickname input", async () => {
    const component = render(
      <TestBed services={services}>
        <LandingScreen />
      </TestBed>
    );
    const nicknameInput = await component.findByTestId("nickname-input");
    expect(nicknameInput.getAttribute("placeholder")).toBe("Your Nickname");
    expect(nicknameInput).toHaveValue("username");
  });

  test("validation error, when sessionname is empty", async () => {
    const services: DeepPartial<Services> = {
      copyService: {
        copy: jest.fn(),
      },
      mobSessionService: {
        username$: of("username"),
        sessionId$: of(""),
        updateSessionIdToRandom: jest.fn(),
        createOrJoinSession: jest.fn().mockImplementation(() => of(false)),
        sessionIdValid$: of(false),
      },
    };
    const component = render(
      <TestBed services={services}>
        <LandingScreen />
      </TestBed>
    );
    const joinButton = await component.findByTestId("join-button");
    joinButton.click();
    expect(services.copyService?.copy).toHaveBeenCalled();
    expect(services.mobSessionService?.createOrJoinSession).toHaveBeenCalled();
    const sessionnameField = await component.findByTestId("validation-error");
    expect(sessionnameField).toHaveTextContent("Required. Allowed characters: 'A-Z a-z 0-9 -'");
  });

  test("validation error, when username is empty", async () => {
    const services: DeepPartial<Services> = {
      copyService: {
        copy: jest.fn(),
      },
      mobSessionService: {
        username$: of(""),
        sessionId$: of("sessionId"),
        updateSessionIdToRandom: jest.fn(),
        createOrJoinSession: jest.fn().mockImplementation(() => of(false)),
        usernameValid$: of(false),
      },
    };
    const component = render(
      <TestBed services={services}>
        <LandingScreen />
      </TestBed>
    );
    const joinButton = await component.findByTestId("join-button");
    joinButton.click();

    const sessionnameField = await component.findByTestId("validation-error");
    expect(sessionnameField).toHaveTextContent("Required");
  });

  test("copy checkbox", async () => {
    const services: DeepPartial<Services> = {
      copyService: {
        copy: jest.fn(),
      },
      mobSessionService: {
        username$: of(""),
        sessionId$: of("sessionId"),
        updateSessionIdToRandom: jest.fn(),
        createOrJoinSession: jest.fn().mockImplementation(() => of(false)),
        usernameValid$: of(false),
      },
    };
    const component = render(
      <TestBed services={services}>
        <LandingScreen />
      </TestBed>
    );
    const joinButton = await component.findByTestId("join-button");
    joinButton.click();
    expect(services.copyService?.copy).toHaveBeenCalled();
    expect(services.mobSessionService?.createOrJoinSession).toHaveBeenCalled();
    joinButton.click();
    expect(services.copyService?.copy).toHaveBeenCalledTimes(2);
    expect(services.mobSessionService?.createOrJoinSession).toHaveBeenCalledTimes(2);
  });
});
