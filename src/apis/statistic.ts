import { AgentType } from "../constants/types/agent.type";
import { WAFAxiosClient } from "./base";

export const statisticApi = {
  getNumOfPrevent24h: () => {
    return WAFAxiosClient('/graph_count_log_within_24h',{
        method: 'GET'
    })
  },
  getTopRuleHit: () => {
    return WAFAxiosClient('/graph-top20-rule-hit',{
      method: 'GET'
    })
  },
  update: (data?: AgentType) => {
    return WAFAxiosClient(`/updateagent/${data?.id}`, {
      method: 'PUT',
      data
    })
  },
  delete: (id?: number) => {
    return WAFAxiosClient(`/deleteagent/${id}`, {
      method: 'DELETE',
    }) 
  },
  getTop10SourceIp: () => {
    return WAFAxiosClient('/grap_TOP10_IP_source_addresses_json',{
      method: 'GET'
    })
  },
  getNumOfDetected24: () => {
    return WAFAxiosClient('/getDetectedTimes?time=24',{
      method: 'GET'
    })
  },
  getNumOfDetected24ById: (id?:number) => {
    return WAFAxiosClient(`/getDetectedTimesByID?time=24&id=${id}`,{
      method: 'GET'
    })
  },
  getNumOfPrevent24hById: (id?:number) => {
    return WAFAxiosClient(`/graph_count_log_within_24h_byID?id=${id}`,{
        method: 'GET'
    })
  },
};
