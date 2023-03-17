import { Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Scan = () => {
    const myStorage = window.localStorage;
    const navigate = useNavigate();
    const [guarda, setGuarda] = useState({});
    const autorizado = (usuario) => {
        const { permit } = usuario;
        if (permit !== undefined) {
            if (permit !== "guarda") {
                navigate("/");
            }
        }
    };
    useEffect(() => {
        setGuarda(JSON.parse(myStorage.getItem("user")));
    }, []);

    useEffect(() => {
        autorizado(guarda);
    }, [guarda]);
    return (
        <Paper
            elevation={3}
            sx={{
                width: "90%",
                margin: "10px auto",
                padding: "15px",
                minHeight: "600px",
            }}
        >
            <Typography variant="h4">Registrar QR</Typography>
            <QrReader
                delay={1200}
                onResult={(result, error) => {
                    if (!!result) {
                        //setData(result);
                        console.log(result.text);
                        console.log(guarda._id);
                        axios
                            .post("http://localhost:8000/api/generar", {
                                guarda: result.text,
                            })
                            .then((res) => {
                                console.log(res.data);
                                axios
                                    .post("http://localhost:8000/api/guardar", {
                                        token: res.data,
                                        lectorId: result.text,
                                    })
                                    .then((result) => {
                                        console.log(result);
                                        if (result.status === 200) {
                                            Swal.fire({
                                                icon: "success",
                                                title: "GENIAL!!!",
                                                text: `Lectura Correcta del Codigo!`,
                                            });
                                        }
                                    });
                            })
                            .catch((error) => console.log(error.response));
                    }
                    if (!!error) {
                        //console.error(error);
                    }
                }}
                style={{ width: "100%" }}
            />
        </Paper>
    );
};

export default Scan;
