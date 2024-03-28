import { ConfigType } from "../constants/types/config.type"
import { WAFAxiosClient } from "./base"

export const ConfigApi = {
    update: (data: ConfigType) => {
        return WAFAxiosClient('/update_config_modsecurity',{
            method: 'POST',
            data
        })
    },
    getConfig: () => {
        return WAFAxiosClient('/get_config_modsecurity',{
            method: 'GET'
        })
    }
}