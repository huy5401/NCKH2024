import { lazy } from "react";
import { LIST_BLOCK_IP } from "../../routes/route.constant";
const listBlockIP = lazy(() => import("../ListBlockIP"));

export default {
  path: LIST_BLOCK_IP,
  element: listBlockIP,
};
