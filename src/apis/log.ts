import { FilterLogType } from "../constants/types/log.type";
import { serialize } from "../utils/validate";
import { WAFAxiosClient } from "./base";

export const LogsApi = {
  exportExcell: (filters?: FilterLogType, params?: { local_port?: string, ServerName?:string }) => {
    return WAFAxiosClient(`/log/get_log_within_time_xlsx?${serialize({ ...filters, ...params })}`, {
      method: "GET",
      responseType: 'arraybuffer',
    })
  },
  getAttackMapByIP: (remoteAddr?: string) => {
    return WAFAxiosClient(`/log/getAttackMapIP?ip=${remoteAddr}`, {
      method: 'GET'
    })
  }
};
