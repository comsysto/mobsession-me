import { useContext } from "react";
import { ServicesContext } from "../services/ServicesContext";

export const useFullscreenService = () => {
  const context = useContext(ServicesContext);
  return context.fullscreenService;
};
