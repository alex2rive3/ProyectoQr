import React, { useEffect, useState } from "react";
import moment from "moment";
import QRCode from "react-qr-code";
import axios from "axios";
axios.defaults.withCredentials = true;
const GereadorQR = () => {
    const myStorage = window.localStorage;
    const [dia, setDia] = useState("");
    const [user, setUser] = useState(JSON.parse(myStorage.getItem("user")));
    setTimeout(() => {
        myStorage.removeItem("user");
    }, 2000);
    const obtenerDia = async () => {
        const res = await moment().format("dddd");
        setDia(res);
    };
    useEffect(() => {
        obtenerDia();
    }, []);
    return (
        <div>
            <h2>Codigo QR Universitario {user.userName}</h2>
            <p>
                Utilice adecuadamente para que sigamos teniendo este veneficio
                tan importante
            </p>
            <div
                style={{
                    height: "auto",
                    margin: "0 auto",
                    maxWidth: 180,
                    width: "100%",
                }}
            >
                {dia === "Monday" ||
                dia === "Tuesday" ||
                dia === "Wednesday" ||
                dia === "Thursday" ||
                dia === "Friday" ? (
                    <>
                        <QRCode
                            size={400}
                            style={{
                                height: "auto",
                                maxWidth: "100%",
                                width: "100%",
                            }}
                            value={"http://localhost:8000/api/generar"}
                            viewBox={`0 0 256 256`}
                        />
                        <p>Codigo correspondiente al dia {dia} </p>
                    </>
                ) : (
                    <h4>El dia de hoy no Tienes Boletos</h4>
                )}
            </div>
        </div>
    );
};

export default GereadorQR;
