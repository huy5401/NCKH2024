import { lazy } from "react";
import { USER_MANAGEMENT } from "../../routes/route.constant";
const userManagement = lazy(() => import("../UserManagement"));

export default {
  path: USER_MANAGEMENT,
  element: userManagement,
};
