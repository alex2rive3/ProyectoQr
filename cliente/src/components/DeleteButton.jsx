import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "@mui/material";

const DeleteButton = ({ id_user, successCallback }) => {
    const eliminarAutor = async (autorId) => {
        try {
            await axios.delete(
                `http://localhost:8000/api/deleteUsers/${autorId}`
            );
            successCallback(autorId);
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

    const confirmarEliminar = (autorId) => {
        Swal.fire({
            title: "Estas seguro de eliminar?",
            text: "No podrás arrepentirte!!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "SI, eliminalo ahora!",
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarAutor(autorId);
            }
        });
    };

    return (
        <Button
            onClick={() => {
                confirmarEliminar(id_user);
            }}
            variant="contained"
            color="secondary"
        >
            Eliminar
        </Button>
    );
};

export default DeleteButton;
