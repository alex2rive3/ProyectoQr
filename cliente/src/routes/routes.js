import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layouts";
import Login from "../components/Login";
import GeneradorQR from "../components/GeneradorQR";
import NotFound from "../pages/NotFound";
import Scan from "../components/Scan";
import AddUser from "../pages/AddUser";
import UserList from "../components/UserList";


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
                element: <Scan />,
            },
            {
                path: "registro",
                element: <AddUser />,
            },
            {
                path: "usuario",
                element: <UserList />,
            },
        ],
    },
]);
