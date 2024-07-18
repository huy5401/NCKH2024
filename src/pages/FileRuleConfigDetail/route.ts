import { lazy } from "react";
import { RULE_MANAGEMENT_DETAILS } from "../../routes/route.constant";
const fileRuleConfigtDetails = lazy(() => import("../FileRuleConfigDetail"));

export default {
  path: RULE_MANAGEMENT_DETAILS,
  element: fileRuleConfigtDetails,
};
