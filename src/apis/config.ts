import { ConfigType } from "../constants/types/config.type"
import { serialize } from "../utils/validate"
import { WAFAxiosClient } from "./base"

export const ConfigApi = {
    update: (data: ConfigType) => {
        return WAFAxiosClient('/config/update_config_modsecurity',{
            method: 'POST',
            data
        })
    },
    getConfig: () => {
        return WAFAxiosClient('/config/get_config_modsecurity',{
            method: 'GET'
        })
    },
    getModeCNN: () => {
        return WAFAxiosClient('/config/get_mode_AI_CNN', {
            method: 'GET',
        })
    },
    getModeSVm: () => {
        return WAFAxiosClient('/config/get_mode_AI_vtr', {
            method: 'GET',
        })
    },
    updateModeAgent: (params: { ServerName?: string, Port?:string, mode?: string }) => {
        return WAFAxiosClient(`/config/update_mode_agent?${serialize({ ...params })}`, {
            method: 'POST'
        })
    },
    updateModelCNN: (params: { mode?: string }) => {
        return WAFAxiosClient(`/config/update_mode_AI_CNN?${serialize({ ...params })}`, {
            method: 'POST'
        })
    },
    updateModelSVM: (params: { mode?: string }) => {
        return WAFAxiosClient(`/config/update_mode_AI_vtr?${serialize({ ...params })}`, {
            method: 'POST'
        })
    },
    
}