import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../types/queryKey";
import { getBookings } from "../../services/apiBookings";
import { type IBookingRes } from "../../types/booking.interface";
import { useSearchParams } from "react-router-dom";

interface useBookingsReturn {
    isLoading: boolean;
    bookings: IBookingRes[] | unknown;
    error: Error | unknown;
}
export function useBookings(): useBookingsReturn {
    const [searchParams] = useSearchParams();
    // Filtering
    const filterValue = searchParams.get("status");
    const filter: {
        field: string;
        value: string;
    } | null =
        !filterValue || "all" === filterValue
            ? null
            : ({ field: "status", value: filterValue } as const);

    // Sorting
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const [field, direction] = sortByRaw.split("-") as [
        keyof IBookingRes,
        "asc" | "desc"
    ];
    const sortBy = { field, direction };

    const {
        isLoading,
        data: bookings,
        error,
    } = useQuery({
        // filter works exactly as the dependency array on useEffect hook
        queryKey: [queryKeys.BOOKINGS, filter, sortBy],
        queryFn: () => getBookings({ filter, sortBy }),
    });
    return { isLoading, bookings, error };
}
