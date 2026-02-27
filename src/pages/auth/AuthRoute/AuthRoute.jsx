import { Navigate, Outlet } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../shared/Loading/Loading";

const AuthRoute = () => {
    const { user, loading } = useAuth();

    // While checking auth
    // if (loading) {
    //     return <Loading />;
    // }

    // If user is logged in → redirect
    if (user) {
        return <Navigate to="/" replace />;
    }

    // Otherwise allow access
    return <Outlet />;
};

export default AuthRoute;
