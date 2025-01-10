import { queryKeys } from "./../../types/queryKey";
import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
    const { data: activities, isLoading } = useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: [queryKeys.TODAY_ACTIVITY],
    });
    return { activities, isLoading };
}
