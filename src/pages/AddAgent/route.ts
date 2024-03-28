import { lazy } from "react";
import { ADD_AGENT } from "../../routes/route.constant";
const addAgent = lazy(() => import("../AddAgent"));

export default {
  path: ADD_AGENT,
  element: addAgent,
};
