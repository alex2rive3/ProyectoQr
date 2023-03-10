import axios from "axios";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import Swal from "sweetalert2";
const Scan = () => {
    const myStorage = window.localStorage;
    const [guarda, setGuarda] = useState(JSON.parse(myStorage.getItem("user")));
    return (
        <>
            <QrReader
                delay={600}
                onResult={(result, error) => {
                    if (!!result) {
                        //setData(result);
                        console.log(result.text);
                        console.log(guarda._id);
                        axios
                            .post("http://localhost:8000/api/generar", {
                                guarda: guarda._id,
                            })
                            .then((res) => {
                                console.log(res.data);
                                axios
                                    .post("http://localhost:8000/api/guardar", {
                                        token: res.data,
                                        lectorId: guarda._id,
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
        </>
    );
};

export default Scan;
