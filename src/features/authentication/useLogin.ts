import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import toast from "react-hot-toast";

export function useLogin() {
    const navigate = useNavigate();
    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => loginApi({ email, password }),
        onSuccess: () => navigate(routes.DASHBOARD),
        onError: (error: Error) => toast.error(error.message),
    });
    return { login, isLoading };
}
