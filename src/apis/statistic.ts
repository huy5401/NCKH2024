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
  }
};
