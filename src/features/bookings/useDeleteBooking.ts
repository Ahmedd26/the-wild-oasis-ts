import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { QueryKeys, queryKeys } from "../../types/queryKey";

export function useDeleteBooking() {
    const queryClient = useQueryClient();
    const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: deleteBookingApi,
        onSuccess: () => {
            toast.success("Booking successfully deleted");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.BOOKINGS] as [QueryKeys],
            });
        },
        onError: (error: Error) => toast.error(error.message),
    });

    return { isDeleting, deleteBooking };
}
