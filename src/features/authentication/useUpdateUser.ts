import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryKeys } from "../../types/queryKey";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: ({ user }) => {
            toast.success("User account successfully updated");
            queryClient.setQueryData([queryKeys.USER], user);
            // queryClient.invalidateQueries({ queryKey: [queryKeys.USER] });
        },
        onError: (error: Error) => toast.error(error.message),
    });

    return { updateUser, isUpdating };
}
