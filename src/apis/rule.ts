import { UpdateRuleType } from "../constants/types/rules.type"
import { serialize } from "../utils/validate"
import { WAFAxiosClient } from "./base"

export const RuleApi = {
    getByServernamePort: (params: { ServerName?: string, Port?: string }) => {
        return WAFAxiosClient('/rule/get_rule_each_agent', {
            method: 'GET',
            params
        })
    },
    getContentRule: (params: { rule_file?: string, id_rule?: string }) => {
        return WAFAxiosClient('/rule/get_content_rule', {
            method: 'GET',
            params
        })
    },
    getContentFileRule: (params: { rule_name?: string }) => {
        return WAFAxiosClient('/rule/get_rule_file_content', {
            method: 'GET',
            params
        })
    },
    getBlacklist: () => {
        return WAFAxiosClient('/rule/get_blacklist', {
            method: 'GET',
        })
    },
    addIPToBlacklist: (params: { ip_address?: string }) => {
        return WAFAxiosClient('/rule/add_ip_to_blacklist', {
            method: 'POST',
            params
        })
    },
    restoreRuleCRS: (params: { id_rule: string }) => {
        return WAFAxiosClient('/rule/add_rule_CRS', {
            method: 'POST',
            params
        })
    },
    restoreRuleEachAgent: (params: { id_rule: string, ServerName: string, Port: string }) => {
        return WAFAxiosClient('/rule/add_rule_CRS', {
            method: 'POST',
            params
        })
    },
    deleteRuleCRS: (params: { rule_file?: string, id_rule?: string }) => {
        return WAFAxiosClient('/ruleremote_rule_CRS', {
            method: 'DELETE',
            params
        })
    },
    deleteRuleEachAgent: (params: { rule_file?: string, id_rule?: string, ServerName?: string, Port?: string }) => {
        return WAFAxiosClient('/rule/delete_rule_CRS_each_agent', {
            method: 'DELETE',
            params
        })
    },
    deleteRuleFile: (params: { rule_name?:string }) => {
        return WAFAxiosClient('/rule/delete_rule_file', {
            method: 'DELETE',
            params
        })
    },
    
    deleteIPFromBlacklist: (params: { ip_address?: string }) => {
        return WAFAxiosClient('/rule/delete_ip_from_blacklist', {
            method: 'DELETE',
            params
        })
    },
    addRuleFile: (data: {name?:string, rules:string}) => {
        return WAFAxiosClient('/rule/create_rule_file', {
            method: 'POST',
            data
        })
    },
    updateRuleFileContent: (data: {name?:string, rules:string}) => {
        return WAFAxiosClient('/rule/update_rule_file_content', {
            method: 'POST',
            data
        })
    },
    updateRuleFileEachAgent: (data: UpdateRuleType) => {
        return WAFAxiosClient('/rule/update_rule_each_agent', {
            method: 'POST',
            data
        })
    },
    updateCRS: () => {
        return WAFAxiosClient('/rule/update_crs', {
            method: 'GET',
        })
    },
    addGeoBlockedIP: (data?: string[]) => {
        return WAFAxiosClient('/rule/add_Geo-BlockIP',{
            method: 'POST',
            data
        })
    },
    removeGeoBlockedIP: (data?: string[]) => {
        return WAFAxiosClient('/rule/remove_Geo-BlockIP',{
            method: 'DELETE',
            data
        })
    }
}
