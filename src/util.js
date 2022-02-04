import config from "./config/config.js";
import { DateTime } from "luxon";
import { uniqueNamesGenerator, adjectives, animals } from "unique-names-generator";

export const expiryDateTime = () => {
  const ttl = Math.floor(DateTime.now().plus({ days: config.session_ttl_days }).toSeconds());
  return ttl;
};
