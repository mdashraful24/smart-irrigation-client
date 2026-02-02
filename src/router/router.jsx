import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home/Home";
import AboutDetails from "../pages/AboutDetails/AboutDetails";
import HighlightShowcase from "../pages/HighlightShowcase/HighlightShowcase";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login/Login";
import SignUp from "../pages/auth/SignUp/SignUp";
import Error404 from "../pages/shared/Error/Error404";
import Monitor from "../pages/Monitor/Monitor";
import FieldDetails from "../pages/Monitor/FieldDetails/FieldDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: Home },
            { path: "about", Component: AboutDetails },
            { path: "highlight", Component: HighlightShowcase },
            { path: "monitor", Component: Monitor },
            { path: "field-details", Component: FieldDetails },
        ]
    },
    {
        path: "auth",
        Component: AuthLayout,
        children: [
            { path: "login", Component: Login },
            { path: "register", Component: SignUp },
        ]
    },
    {
        path: "*",
        Component: Error404
    }
]);
