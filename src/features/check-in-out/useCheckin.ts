import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { queryKeys } from "../../types/queryKey";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

export function useChecking() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
        mutationFn: (bookingId: string) =>
            updateBooking(bookingId, {
                status: "checked-in",
                isPaid: true,
            }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully  checked in`);
            queryClient.invalidateQueries({ queryKey: [queryKeys.BOOKINGS] });
            navigate(routes.DASHBOARD);
        },
        onError: () => {
            toast.error("There was an error while checking in");
        },
    });
    return { checkin, isCheckingIn };
}
