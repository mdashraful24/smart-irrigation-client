import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home/Home";
import AboutDetails from "../pages/AboutDetails/AboutDetails";
import HighlightShowcase from "../pages/HighlightShowcase/HighlightShowcase";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login/Login";
import SignUp from "../pages/auth/SignUp/SignUp";
import Error404 from "../pages/shared/Error/Error404";
import Fields from "../pages/FieldsInfo/Fields/Fields";
import Crops from "../pages/CropsInfo/Crops/Crops";
import CropDetails from "../pages/CropsInfo/CropDetails/CropDetails";
import AuthRoute from "../pages/auth/AuthRoute/AuthRoute";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            Component: RootLayout,
            children: [
                { index: true, Component: Home },
                { path: "about", Component: AboutDetails },
                { path: "highlight", Component: HighlightShowcase },
                { path: "all-fields", Component: Fields },
                { path: "all-crops", Component: Crops },
                { path: "crop-details", Component: CropDetails },
            ],
        },
        {
            path: "auth",
            Component: AuthLayout,
            children: [
                {
                    element: <AuthRoute />,
                    children: [
                        { path: "login", Component: Login },
                        { path: "register", Component: SignUp },
                    ],
                },
            ],
        },
        {
            path: "*",
            Component: Error404,
        },
    ],
    {
        basename:
            import.meta.env.MODE === "production"
                ? "/smart_irrigation_system"
                : "/",
    }
);
