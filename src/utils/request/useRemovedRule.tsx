import useSWR from "swr";
import { CommonGetAllParams } from "../../constants/types/common.type";
import { serialize } from "../validate";

export const useRemovedRule = (
    params?: CommonGetAllParams,
    filter?: {ServerName:string, port:string}
) => {
    const { data, error, isLoading, mutate } = useSWR(
        `/rule/get_deleted_ID_Rule?${serialize({
            ...params,
            ...filter,
        })}`,
        { refreshInterval: 0}
    );
    return {
        data, error, isLoading, mutate
    };
}