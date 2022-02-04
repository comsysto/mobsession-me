import { useContext } from "react";
import { ServicesContext } from "../services/ServicesContext";

export const useSessionRepository = () => {
  const services = useContext(ServicesContext);
  return services.sessionRepository;
};
