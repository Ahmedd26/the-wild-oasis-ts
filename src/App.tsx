import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { routes } from "./routes";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import NewUsers from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
    return (
        <>
            <GlobalStyles /> {/* Styled Component */}
            <BrowserRouter>
                <Routes>
                    <Route
                        index
                        element={<Navigate replace to={routes.DASHBOARD} />}
                    />
                    <Route path={routes.DASHBOARD} element={<Dashboard />} />
                    <Route path={routes.BOOKINGS} element={<Bookings />} />
                    <Route path={routes.CABINS} element={<Cabins />} />
                    <Route path={routes.USERS} element={<NewUsers />} />
                    <Route path={routes.SETTINGS} element={<Settings />} />
                    <Route path={routes.ACCOUNT} element={<Account />} />
                    <Route path={routes.LOGIN} element={<Login />} />
                    <Route path={routes.NOT_FOUND} element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
