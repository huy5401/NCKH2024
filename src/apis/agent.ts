import { AgentType } from "../constants/types/agent.type";
import { WAFAxiosClient } from "./base";

export const agentApi = {
  getById: (id?: string) => {
    return WAFAxiosClient(`/getagent/${id}`, {
      method: 'GET',
    }) 
  },
  add: (data?: AgentType) => {
    return WAFAxiosClient("/addagent", {
      method: "POST",
      data,
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
