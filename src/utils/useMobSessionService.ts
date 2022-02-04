import { useContext } from "react";
import { ServicesContext } from "../services/ServicesContext";
import { SessionService } from "../services/SessionService";

export const useMobSessionService = (): SessionService => {
  const services = useContext(ServicesContext);
  return services.mobSessionService;
};
