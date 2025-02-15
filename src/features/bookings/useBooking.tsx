import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../types/queryKey";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
    const { bookingId } = useParams();

    const {
        isLoading,
        data: booking,
        error,
    } = useQuery({
        queryKey: [queryKeys.BOOKING, bookingId],
        queryFn: () => getBooking(bookingId!),
        retry: false,
    });
    return { isLoading, booking, error };
}
