import { UpdateRuleType } from "../constants/types/rules.type"
import { serialize } from "../utils/validate"
import { WAFAxiosClient } from "./base"

export const RuleApi = {
    getByServername: (params: {ServerName?:string}) => {
        return WAFAxiosClient('/get_rule', {
            method: 'GET',
            params
        })
    },
    update: (data: UpdateRuleType) => {
        return WAFAxiosClient('/updaterule',{
            method: 'POST',
            data
        })
    },
    updateModeAgent: (params: {ServerName?:string, mode?:string}) => {
        return WAFAxiosClient(`/update_mode_agent?${serialize({...params})}`,{
            method: 'POST'
        })
    },
    updateModelCNN: (params: {mode?:string}) => {
        return WAFAxiosClient(`/update_mode_AI_CNN?${serialize({...params})}`,{
            method: 'POST'
        })
    },
    updateModelSVM: (params: {mode?:string}) => {
        return WAFAxiosClient(`/update_mode_AI_vtr?${serialize({...params})}`,{
            method: 'POST'
        })
    },
    updateCRS: () => {
        return WAFAxiosClient('/update_crs', {
            method: 'GET',
        })
    },
    getModeCNN: () => {
        return WAFAxiosClient('/get_mode_AI_CNN', {
            method: 'GET',
        })
    },
    getModeSVm: () => {
        return WAFAxiosClient('/get_mode_AI_vtr', {
            method: 'GET',
        })
    }
}
