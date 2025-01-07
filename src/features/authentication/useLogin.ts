import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { queryKeys } from "../../types/queryKey";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => loginApi({ email, password }),
        onSuccess: (user) => {
            queryClient.setQueryData([queryKeys.USER], user.user);
            navigate("/", { replace: true });
            // navigate("/");
        },
        onError: (error: Error) => toast.error(error.message),
    });
    return { login, isLoading };
}
