import { FilterLogType } from "../constants/types/log.type";
import { serialize } from "../utils/validate";
import { WAFAxiosClient } from "./base";

export const LogsApi = {
    exportExcell: (filters?: FilterLogType, params?: {local_port?:string}) => {
      return WAFAxiosClient(`/get_log_within_time_xlsx?${serialize({...filters, ...params})}`, {
        method: "GET",
        responseType: 'arraybuffer',
      })
    },
  };
  