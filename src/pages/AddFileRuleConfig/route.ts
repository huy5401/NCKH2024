import { lazy } from "react";
import { ADD_FILE_CONFIG } from "../../routes/route.constant";
const addFileRuleConfig = lazy(() => import("../AddFileRuleConfig"));

export default {
  path: ADD_FILE_CONFIG,
  element: addFileRuleConfig,
};
