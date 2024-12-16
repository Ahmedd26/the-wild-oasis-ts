import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { routes } from "./routes";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import NewUsers from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./services/queryClient";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <GlobalStyles /> {/* Styled Component */}
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route
                            index
                            element={<Navigate replace to={routes.DASHBOARD} />}
                        />
                        <Route
                            path={routes.DASHBOARD}
                            element={<Dashboard />}
                        />
                        <Route path={routes.BOOKINGS} element={<Bookings />} />
                        <Route path={routes.CABINS} element={<Cabins />} />
                        <Route path={routes.USERS} element={<NewUsers />} />
                        <Route path={routes.SETTINGS} element={<Settings />} />
                        <Route path={routes.ACCOUNT} element={<Account />} />
                    </Route>
                    <Route path={routes.LOGIN} element={<Login />} />
                    <Route path={routes.NOT_FOUND} element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
