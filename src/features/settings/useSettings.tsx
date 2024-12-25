import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../types/queryKey";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
    const {
        isLoading,
        error,
        data: settings,
    } = useQuery({
        queryKey: [queryKeys.SETTINGS],
        queryFn: getSettings,
    });

    return { isLoading, error, settings };
}
