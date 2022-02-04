import { useContext } from "react";
import { ServicesContext } from "../services/ServicesContext";

export const useTimerService = () => {
  const services = useContext(ServicesContext);
  return services.timerService;
};
