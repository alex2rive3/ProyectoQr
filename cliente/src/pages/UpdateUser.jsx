import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import FormUser from "../components/FormUser";

const UpdateUser = () => {
    const navigate = useNavigate();

    const valorInicial = {
        userName: "",
        email: "",
        password: "",
        permit: "",
    };

    const { id } = useParams();
    const [autor, setAutor] = useState(valorInicial);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(
                `http://localhost:8000/api/getUser/${id}`
            );
            setAutor(res.data);
        };

        getData();
    }, [id]);

    const actualizarUsuario = async (values, actions) => {
        try {
            const res = await axios.put(
                `${process.env.REACT_APP_API_URL}/autores/${id}`,
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
                initialValues={autor}
                botonTexto="Actualizar"
                onSubmit={actualizarUsuario}
            />
        </>
    );
};

export default UpdateUser;
