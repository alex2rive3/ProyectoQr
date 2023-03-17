import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import FormUser from "../components/FormUser";

const UpdateUser = ({ id }) => {
    const navigate = useNavigate();
    const valorInicial = {
        userName: "",
        email: "",
        password: "",
        permit: "",
    };

    const [user, setUser] = useState(valorInicial);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(
                `http://localhost:8000/api/getUser/${id}`
            );
            setUser(res.data);
        };

        getData();
    }, [id]);

    const actualizarUsuario = async (values, actions) => {
        try {
            const res = await axios.put(
                `http://localhost:8000/api/user/${id}`,
                values
            );
            console.log(res);
            if (res.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "GENIAL!!!",
                    text: `Se ha actualizado el usuario ${res.data.userName}!`,
                });

                navigate("/admin");
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Ops que mal!!!",
                text: `Error: ${
                    error?.response?.data?.message || error.message
                }`,
            });
        }
    };

    return (
        <>
            <h1>Editar Usuario</h1>
            <FormUser
                initialValues={user}
                botonTexto="Actualizar"
                onSubmit={actualizarUsuario}
            />
        </>
    );
};

export default UpdateUser;
