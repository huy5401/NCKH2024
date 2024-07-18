import useSWR from "swr";
import { CommonGetAllParams } from "../../constants/types/common.type";
import { serialize } from "../validate";
import { FilterLogType } from "../../constants/types/log.type";

export const useLog = (
    params?: CommonGetAllParams,
    filter?: FilterLogType,
    local_port?: string,
    server_name?:string
) => {
    const { data, error, isLoading, mutate } = useSWR(
        `/log/getLogWithinTime?local_port=${local_port}&ServerName=${server_name}&${serialize({
            ...params,
            ...filter,
            
        })}`,
        { refreshInterval: 0}
    );
    return {
        data, error, isLoading, mutate
    };
}