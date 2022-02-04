import { render } from "@testing-library/react";
import { PageFrame } from "../common/PageFrame";
import { TestBed, DeepPartial } from "./TestBed";
import { Services } from "../../services/ServicesContext";
import { of } from "rxjs";

const services: DeepPartial<Services> = {
  mobSessionService: {
    username$: of("username"),
    sessionId$: of("sessionId"),
  },
};
describe("PageFrame Component", () => {
  describe("sessionname input", () => {
    test("should contain a landing screen", async () => {
      const component = render(
        <TestBed services={services}>
          <PageFrame />
        </TestBed>
      );
    });
  });
});
