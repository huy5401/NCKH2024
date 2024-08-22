import useSWR from "swr";
export const usePerformance = () => {
    const { data, error, isLoading, mutate } = useSWR(
        `/performance/get_performance`,
        { refreshInterval: 5000}
    );
    return {
        data, error, isLoading, mutate
    };
}