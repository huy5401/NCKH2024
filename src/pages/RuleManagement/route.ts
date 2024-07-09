import { lazy } from "react";
import { RULE_MANAGEMENT } from "../../routes/route.constant";
const ruleManagement = lazy(() => import("../RuleManagement"));

export default {
  path: RULE_MANAGEMENT,
  element: ruleManagement,
};
