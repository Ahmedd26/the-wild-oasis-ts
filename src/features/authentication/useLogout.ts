import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: logout, isLoading } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate(routes.LOGIN, { replace: true });
        },
    });
    return { logout, isLoading };
}
