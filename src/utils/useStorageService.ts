import { useContext } from "react";
import { ServicesContext } from "../services/ServicesContext";

export const useStorageService = () => {
  return useContext(ServicesContext).storageService;
};
