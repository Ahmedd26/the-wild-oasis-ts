import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../types/queryKey";
import { getBookings } from "../../services/apiBookings";
import { type IBookingRes } from "../../types/booking.interface";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

interface useBookingsReturn {
    isLoading: boolean;
    bookings: IBookingRes[] | unknown;
    error: Error | unknown;
    count: number | null;
}
export function useBookings(): useBookingsReturn {
    const queryClient = useQueryClient();
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

    // Pagination
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));
    // Query
    const { isLoading, data, error } = useQuery({
        // filter works exactly as the dependency array on useEffect hook
        queryKey: [queryKeys.BOOKINGS, filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    // Pre-fetching
    const pageCount = Math.ceil(data?.count ?? 0 / PAGE_SIZE);
    if (page > pageCount)
        queryClient.prefetchQuery({
            queryKey: [queryKeys.BOOKINGS, filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        });
    // Pre-fetching
    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: [queryKeys.BOOKINGS, filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        });
    return {
        isLoading,
        bookings: data?.data ?? [],
        error,
        count: data?.count ?? null,
    };
}
