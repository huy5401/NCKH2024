import { AgentType } from "../constants/types/agent.type";
import { serialize } from "../utils/validate";
import { WAFAxiosClient } from "./base";

export const statisticApi = {
  getNumOfPrevent24h: () => {
    return WAFAxiosClient('/log/graph_count_log_within_24h', {
      method: 'GET'
    })
  },
  getTopRuleHit: () => {
    return WAFAxiosClient('/log/graph-top20-rule-hit', {
      method: 'GET'
    })
  },
  update: (data?: AgentType) => {
    return WAFAxiosClient(`/agent/updateagent/${data?.id}`, {
      method: 'PUT',
      data
    })
  },
  delete: (id?: number) => {
    return WAFAxiosClient(`/agent/deleteagent/${id}`, {
      method: 'DELETE',
    })
  },
  getTop10SourceIp: () => {
    return WAFAxiosClient('/log/grap_TOP10_IP_source_addresses_json', {
      method: 'GET'
    })
  },
  getNumOfDetected24: () => {
    return WAFAxiosClient('/log/getDetectedTimes?time=24', {
      method: 'GET'
    })
  },
  getNumOfDetected24ById: (id?: number) => {
    return WAFAxiosClient(`/log/getDetectedTimesByID?time=24&id=${id}`, {
      method: 'GET'
    })
  },
  getNumOfPrevent24hById: (id?: number) => {
    return WAFAxiosClient(`/log/graph_count_log_within_24h_byID?id=${id}`, {
      method: 'GET'
    })
  },
  getNumOfRequests: () => {
    return WAFAxiosClient(`/log/count_request?time=24`, {
      method: 'GET'
    })
  },
  getNumOfRequestsByServerName: (params?: { ServerName?: string, local_port?: string, time: number }) => {
    return WAFAxiosClient(`/log/count_request_by_servername?${serialize(params)}`, {
      method: 'GET'
    })
  },
};
