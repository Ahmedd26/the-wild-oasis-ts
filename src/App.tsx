// ** React ** //
import { lazy, Suspense } from "react";
// ** Routing ** //
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
// ** Remote State Management ** //
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./services/queryClient";
// ** Pages ** //
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Cabins = lazy(() => import("./pages/Cabins"));
const NewUsers = lazy(() => import("./pages/Users"));
const Settings = lazy(() => import("./pages/Settings"));
const Account = lazy(() => import("./pages/Account"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
// ** Layout & Styles ** //
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import SpinnerFullPage from "./ui/SpinnerFullPage";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <GlobalStyles /> {/* Styled Component */}
            <BrowserRouter>
                <Suspense fallback={<SpinnerFullPage />}>
                    <Routes>
                        <Route element={<AppLayout />}>
                            <Route
                                index
                                element={
                                    <Navigate replace to={routes.DASHBOARD} />
                                }
                            />
                            <Route
                                path={routes.DASHBOARD}
                                element={<Dashboard />}
                            />
                            <Route
                                path={routes.BOOKINGS}
                                element={<Bookings />}
                            />
                            <Route path={routes.CABINS} element={<Cabins />} />
                            <Route path={routes.USERS} element={<NewUsers />} />
                            <Route
                                path={routes.SETTINGS}
                                element={<Settings />}
                            />
                            <Route
                                path={routes.ACCOUNT}
                                element={<Account />}
                            />
                        </Route>
                        <Route path={routes.LOGIN} element={<Login />} />
                        <Route
                            path={routes.NOT_FOUND}
                            element={<PageNotFound />}
                        />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
