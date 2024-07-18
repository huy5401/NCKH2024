import { UpdateRuleType } from "../constants/types/rules.type"
import { serialize } from "../utils/validate"
import { WAFAxiosClient } from "./base"

export const RuleApi = {
    getByServernamePort: (params: {ServerName?:string, Port?:string}) => {
        return WAFAxiosClient('/rule/get_rule', {
            method: 'GET',
            params
        })
    },
    update: (data: UpdateRuleType) => {
        return WAFAxiosClient('/rule/updaterule',{
            method: 'POST',
            data
        })
    },
    updateModeAgent: (params: {ServerName?:string, mode?:string}) => {
        return WAFAxiosClient(`/rule/update_mode_agent?${serialize({...params})}`,{
            method: 'POST'
        })
    },
    updateModelCNN: (params: {mode?:string}) => {
        return WAFAxiosClient(`/rule/update_mode_AI_CNN?${serialize({...params})}`,{
            method: 'POST'
        })
    },
    updateModelSVM: (params: {mode?:string}) => {
        return WAFAxiosClient(`/rule/update_mode_AI_vtr?${serialize({...params})}`,{
            method: 'POST'
        })
    },
    updateCRS: () => {
        return WAFAxiosClient('/rule/update_crs', {
            method: 'GET',
        })
    },
    getModeCNN: () => {
        return WAFAxiosClient('/rule/get_mode_AI_CNN', {
            method: 'GET',
        })
    },
    getModeSVm: () => {
        return WAFAxiosClient('/rule/get_mode_AI_vtr', {
            method: 'GET',
        })
    }
}
