import { render } from "@testing-library/react";
import { useContext, useState } from "react";
import { Services, ServicesContext } from "../ServicesContext";

describe("ServicesContext", () => {
  it("should provide context for all services", () => {
    const WrapperComponent = () => {
      const [services] = useState(() => new Services());

      return (
        <ServicesContext.Provider value={services}>
          <ChildComponent />
        </ServicesContext.Provider>
      );
    };

    const ChildComponent = () => {
      const services = useContext(ServicesContext);

      // since hooks can only be used inside functional React components
      // test expactions must be placed inside as well
      expect(services.graphQlClient).toBeTruthy();
      expect(services.sessionRepository).toBeTruthy();
      expect(services.storageService).toBeTruthy();
      expect(services.config).toBeTruthy();
      expect(services.mobSessionService).toBeTruthy();
      expect(services.timerService).toBeTruthy();
      expect(services.speechService).toBeTruthy();
      expect(services.copyService).toBeTruthy();
      expect(services.fullscreenService).toBeTruthy();

      return <div />;
    };

    render(<WrapperComponent />);
  });

  it("calls close() methods on relevant services", () => {
    const WrapperComponent = () => {
      const [services] = useState(() => new Services());

      return (
        <ServicesContext.Provider value={services}>
          <ChildComponent />
        </ServicesContext.Provider>
      );
    };

    const ChildComponent = () => {
      const services = useContext(ServicesContext);

      services.timerService.close = jest.fn();
      services.sessionRepository.close = jest.fn();
      services.speechService.close = jest.fn();
      services.storageService.close = jest.fn();

      // since hooks can only be used inside functional React components
      // test expactions must be placed inside as well
      services.close();

      expect(services.timerService.close).toHaveBeenCalledTimes(1);
      expect(services.sessionRepository.close).toHaveBeenCalledTimes(1);
      expect(services.speechService.close).toHaveBeenCalledTimes(1);
      expect(services.storageService.close).toHaveBeenCalledTimes(1);

      return <div />;
    };

    render(<WrapperComponent />);
  });
});
