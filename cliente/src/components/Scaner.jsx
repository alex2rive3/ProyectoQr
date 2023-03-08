import axios from "axios";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
const Scaner = () => {
    const myStorage = window.localStorage;
    const [startScan, setStartScan] = useState(false);
    const [loadingScan, setLoadingScan] = useState(false);
    const [data, setData] = useState("");
    const [idUser, setIdUser] = useState("");
    const [registro, setRegistro] = useState(false);
    const [guarda, setGuarda] = useState(JSON.parse(myStorage.getItem("user")));
    setTimeout(() => {
        myStorage.removeItem("user");
    }, 2000);
    console.log(guarda._id);
    const handleScan = async (scanData) => {
        setLoadingScan(true);
        if (scanData && scanData !== "") {
            setData(scanData.text);
            setIdUser(scanData.text.split("/").slice(5, 6).join(""));
            setStartScan(false);
            setLoadingScan(false);
            if (registro === false) {
                setRegistro(true);
                console.log(idUser);
                const result = await axios.post(
                    "http://localhost:8000/api/generar",
                    {
                        user: idUser,
                        guarda: guarda._id,
                    }
                );
                const token = result.data;
                const res = await axios.post(
                    "http://localhost:8000/api/guardar",
                    {
                        generadorId: idUser,
                        token: token,
                        lectorId: guarda._id,
                    }
                );
                console.log(res);
            }
        }
    };
    const handleError = (err) => {
        console.error(err);
    };
    return (
        <div className="App">
            <h1>Escanear codigo de descuento</h1>
            <button
                onClick={() => {
                    setStartScan(!startScan);
                }}
            >
                {startScan ? "Stop Scan" : "Start Scan"}
            </button>
            {startScan && (
                <>
                    <QrReader
                        constraints={{ facingMode: "environment" }}
                        delay={1000}
                        onError={handleError}
                        onResult={handleScan}
                        style={{ width: "300px" }}
                    />
                </>
            )}
            {loadingScan && <p>Loading</p>}
            {data !== "" && <p>{data}</p>}
            {idUser !== "" && <p>Id del Uusuario {idUser}</p>}
        </div>
    );
};

export default Scaner;

// {
//     "generadorId": '64026ad11ec9b876826f48f8',
//     "token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwMjMtMDMtMDhUMTk6MDE6NTMuNzQ1WiIsInVzZXIiOiIiLCJndWFyZGEiOiI2NDAyNmFmYTFlYzliODc2ODI2ZjQ4ZmMiLCJpYXQiOjE2NzgzMDIxMTN9.3ZO0kgC14Oi26S1DU2yUfPXqe_Tpd8UU5etU8l4F5pQ',
//     "lectorId": '64026afa1ec9b876826f48fc'
//   }
