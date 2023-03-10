import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import FormUser from "../components/FormUser";

const AddUser = () => {
    const valorInicial = {
        userName: "",
        email: "",
        password: "",
        permit: "",
    };
    const crearUsuario = async (values, actions) => {
        try {
            const res = await axios.post(
                "http://localhost:8000/api/register",
                values
            );
            console.log(res);
            if (res.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "GENIAL!!!",
                    text: `Se ha agrego perfectamente el Usuario ${res.data.userName}!`,
                });

                actions.resetForm(valorInicial);
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
        <FormUser
            initialValues={valorInicial}
            botonTexto="Agregar"
            onSubmit={crearUsuario}
        />
    );
};

export default AddUser;
