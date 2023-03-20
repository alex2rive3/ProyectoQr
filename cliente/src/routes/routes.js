import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layouts";
import Login from "../components/Login";
import GeneradorQR from "../components/GeneradorQR";
import NotFound from "../pages/NotFound";
import Scaner from "../components/Scaner";
import Admin from "../pages/Admin";
import TableList from "../components/TableListLector";
import UpdateUser from "../pages/UpdateUser";

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
        path: "admin",
        element: <Admin />,
      },
      {
        path: "user/:id",
        element: <UpdateUser />,
      },
    ],
  },
  {
    path: "data",
    element: <TableList />,
  },
  {
    path: "data-admin",
    element: <TableListAdmin />,
  },
]);
