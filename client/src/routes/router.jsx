import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/home"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/relatorios",
        element: <Home />,
    },
])

export default router