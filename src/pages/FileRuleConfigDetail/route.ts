import { lazy } from "react";
import { RULE_FILE_DETAILS } from "../../routes/route.constant";
const fileRuleConfigtDetails = lazy(() => import("../FileRuleConfigDetail"));

export default {
  path: RULE_FILE_DETAILS,
  element: fileRuleConfigtDetails,
};
