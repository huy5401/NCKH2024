import useSWR from "swr";
export const useGetAllBlockedCoutries = () => {
    const { data, error, isLoading, mutate } = useSWR(
        `/rule/get_blocked_countries?page=1&page_size=1000`,
        { refreshInterval: 0}
    );
    return {
        data, error, isLoading, mutate
    };
}