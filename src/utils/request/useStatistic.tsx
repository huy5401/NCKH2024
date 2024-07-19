import useSWR from "swr";

export const useNumOfPrevent24h = () => {    
    const { data, error, isLoading, mutate } = useSWR(
        `/log/graph_count_log_within_24h`,
        { refreshInterval: 0}
    );    
    return {
        data, error, isLoading, mutate
    };
}

export const useTopRuleHit = () => {
    const {data, error, isLoading, mutate} = useSWR(
        '/log/graph-top20-rule-hit',
        {refreshInterval: 0}
    );
    return {data, error, isLoading, mutate}
}

export const useGetLevelRequestStatistic = () => {
    const {data, error, isLoading, mutate} = useSWR(
        '/log/get_severity',
        {refreshInterval: 0}
    );
    return {data, error, isLoading, mutate}
}