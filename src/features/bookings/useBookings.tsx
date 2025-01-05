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

    const filterValue = searchParams.get("status");
    const filter: {
        field: string;
        value: string;
    } | null =
        !filterValue || "all" === filterValue
            ? null
            : ({ field: "status", value: filterValue } as const);

    const {
        isLoading,
        data: bookings,
        error,
    } = useQuery({
        // filter works exactly as the dependency array on useEffect hook
        queryKey: [queryKeys.BOOKINGS, filter],
        queryFn: () => getBookings({ filter }),
    });
    return { isLoading, bookings, error };
}
