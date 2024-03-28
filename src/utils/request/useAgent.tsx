import useSWR from "swr";
import { CommonGetAllParams } from "../../constants/types/common.type";
import { serialize } from "../validate";

export const useAgent = (
    params?: CommonGetAllParams,
    filter?: {filters?: string}
) => {
    const { data, error, isLoading, mutate } = useSWR(
        `/getagent?${serialize({
            ...params,
            ...filter
        })}`,
        { refreshInterval: 0}
    );
    return {
        data, error, isLoading, mutate
    };
}
