import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layouts";
import Login from "../components/Login";
import GeneradorQR from "../components/GeneradorQR";
import NotFound from "../pages/NotFound";
import Scaner from "../components/Scaner";
import Scan from "../components/Scan";
import AddUser from "../pages/AddUser";
import Admin from "../pages/Admin";


export default createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Login />,
            },
            {
                path: "generar",
                element: <GeneradorQR />,
            },
            {
                path: "scan",
                element: <Scaner />,
            },
            {
                path: "scaner",
                element: <Scan />,
            },
            {
                path: "registro",
                element: <AddUser />,
            },
            {
                path: "admin",
                element: <Admin />,
            },
        ],
    },
]);
