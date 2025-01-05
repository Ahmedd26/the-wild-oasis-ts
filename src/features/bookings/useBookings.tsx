import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../types/queryKey";
import { getBookings } from "../../services/apiBookings";
import { type IBookingRes } from "../../types/booking.interface";

interface useBookingsReturn {
    isLoading: boolean;
    bookings: IBookingRes[] | unknown;
    error: Error | unknown;
}
export function useBookings(): useBookingsReturn {
    const {
        isLoading,
        data: bookings,
        error,
    } = useQuery({
        queryKey: [queryKeys.BOOKINGS],
        queryFn: getBookings,
    });
    return { isLoading, bookings, error };
}
