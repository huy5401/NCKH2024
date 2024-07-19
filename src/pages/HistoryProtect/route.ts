import { lazy } from "react";
import { HISTORY_PROTECT } from "../../routes/route.constant";
const historyProtect = lazy(() => import("../HistoryProtect"));

export default {
  path: HISTORY_PROTECT,
  element: historyProtect,
};
