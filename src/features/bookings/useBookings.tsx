import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../types/queryKey";
import { getBookings } from "../../services/apiBookings";
import { type IBookingRes } from "../../types/booking.interface";
import { useSearchParams } from "react-router-dom";

interface useBookingsReturn {
    isLoading: boolean;
    bookings: IBookingRes[] | unknown;
    error: Error | unknown;
    count: number | null;
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

    // Pagination
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    const { isLoading, data, error } = useQuery({
        // filter works exactly as the dependency array on useEffect hook
        queryKey: [queryKeys.BOOKINGS, filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });
    return {
        isLoading,
        bookings: data?.data ?? [],
        error,
        count: data?.count ?? null,
    };
}
