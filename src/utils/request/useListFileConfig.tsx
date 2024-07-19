import useSWR from "swr";
import { CommonGetAllParams } from "../../constants/types/common.type";
import { serialize } from "../validate";

export const useListFileConfig = (
    params?: CommonGetAllParams,
) => {
    const { data, error, isLoading, mutate } = useSWR(
        `/rule/get_rule_file?${serialize({
            ...params,            
        })}`,
        { refreshInterval: 0}
    );
    return {
        data, error, isLoading, mutate
    };
}