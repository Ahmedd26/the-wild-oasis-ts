import { useUser } from "./useUser";
import SpinnerFullPage from "../../ui/SpinnerFullPage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface Props {
    children: React.ReactNode;
}

function ProtectedRoutes({ children }: Props) {
    const navigate = useNavigate();
    // 1. Load the authenticated user
    const { isLoading, isAuthenticated } = useUser();

    // 2. If there is NO Authenticated user, redirect to the login page
    useEffect(
        function () {
            if (!isAuthenticated && !isLoading) navigate("/login");
        },
        [isAuthenticated, navigate, isLoading]
    );

    // 3. While Loading, show a spinner
    if (isLoading) return <SpinnerFullPage />;

    // 4. If there is an authenticated user, render the app/children
    if (isAuthenticated) return children;
}

export default ProtectedRoutes;
