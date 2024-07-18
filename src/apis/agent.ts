import { AgentType } from "../constants/types/agent.type";
import { WAFAxiosClient } from "./base";

export const agentApi = {
  getById: (id?: string) => {
    return WAFAxiosClient(`/agent/getagent/${id}`, {
      method: 'GET',
    }) 
  },
  add: (data?: AgentType) => {
    return WAFAxiosClient("/agent/addagent", {
      method: "POST",
      data,
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
  }
};
