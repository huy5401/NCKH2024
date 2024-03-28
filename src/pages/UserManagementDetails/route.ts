import { lazy } from "react";
import { USER_MANAGEMENT_DETAILS } from "../../routes/route.constant";
const useManagementDetails = lazy(() => import("../UserManagementDetails"));

export default {
  path: USER_MANAGEMENT_DETAILS,
  element: useManagementDetails,
};
