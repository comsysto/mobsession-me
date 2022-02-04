import { useContext } from "react";
import { ServicesContext } from "../services/ServicesContext";

export const useCopyService = () => {
  const services = useContext(ServicesContext);
  return services.copyService;
};
