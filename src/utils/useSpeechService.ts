import { useContext } from "react";
import { ServicesContext } from "../services/ServicesContext";

export const useSpeechService = () => {
  const services = useContext(ServicesContext);
  return services.speechService;
};
