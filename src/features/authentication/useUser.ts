import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { queryKeys } from "../../types/queryKey";

export function useUser() {
    const { isLoading, data: user } = useQuery({
        queryKey: [queryKeys.USER],
        queryFn: getCurrentUser,
    });
    return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
