import { Paper, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import FormUser from "../components/FormUser";

const AddUser = ({ setAct }) => {
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
                    text: `Se ha agrego perfectamente el Usuario!`,
                });
                setAct(res.data.user.email);
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
        <Paper elevation={3} sx={{ minWidth: 350, padding: "10px 18px" }}>
            <Typography
                variant="h5"
                sx={{ textAlign: "center", marginBottom: "8px" }}
            >
                Agreagar Usuario
            </Typography>
            <FormUser
                initialValues={valorInicial}
                botonTexto="Agregar"
                onSubmit={crearUsuario}
            />
        </Paper>
    );
};
export default AddUser;
