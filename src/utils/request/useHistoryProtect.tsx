import useSWR from "swr";
import { CommonGetAllParams } from "../../constants/types/common.type";
import { serialize } from "../validate";
import { FilterLogType } from "../../constants/types/log.type";

export const useHistoryProtect = (
    params?: CommonGetAllParams,
    filter?: FilterLogType,
) => {
    const { data, error, isLoading, mutate } = useSWR(
        `/log/getLogWithinTime?${serialize({
            ...params,
            ...filter,
            
        })}`,
        { refreshInterval: 0}
    );
    return {
        data, error, isLoading, mutate
    };
}