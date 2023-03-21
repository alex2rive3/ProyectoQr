import axios from "axios";
import { Alert, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import Swal from "sweetalert2";
import MenuBar from "../layouts/Menu";
const Scaner = () => {
  const myStorage = window.localStorage;
  const [guarda, setGuarda] = useState(JSON.parse(myStorage.getItem("user")));
  const [count, setCount] = useState(0);
  const [actualizarCount, setActualizarCount] = useState("");
  const getCount = async () => {
    const today = new Date();
    const lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );

    const response = await axios.get(`http://localhost:8000/api/countDiario`);
    setCount(response.data);
  };
  useEffect(() => {
    getCount();
  }, [actualizarCount]);

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "90%",
          padding: "15px",
          minHeight: "600px",
        }}
      >
        <MenuBar />
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Registrar QR
        </Typography>
        <Alert severity="success">
          <strong>{count} Registrados el dia de hoy</strong>
        </Alert>
        <QrReader
          delay={600}
          onResult={(result, error) => {
            if (!!result) {
              //Llamado a la Api para control de Lectura control de lectura
              axios
                .post("http://localhost:8000/api/checkUser", {
                  user_id: result.text,
                })
                .then((pase) => {
                  console.log(pase);
                  const bandera = true;
                  if (bandera === true) {
                    //llamda a la api para guardar id del Usuario Universitario y el del Transporte(guarda)
                    axios
                      .post("http://localhost:8000/api/guardar", {
                        generadorId: result.text,
                        lectorId: guarda._id,
                      })
                      .then((res) => {
                        console.log(res.data);
                        if (res.status === 200) {
                          setActualizarCount(res.data._id);
                          Swal.fire({
                            icon: "success",
                            title: "GENIAL!!!",
                            text: `Lectura Correcta del Codigo!`,
                          });
                        }
                      });
                  } else if (pase.pass === false) {
                    Swal.fire({
                      icon: "error",
                      title: "ERROR!!!",
                      text: `Este Codigo ya fue Registrado el dia de Hoy !`,
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "ERROR!!!",
                      text: `El Usuario no esta registrado `,
                    });
                  }
                })
                .catch((error) => {
                  Swal.fire({
                    icon: "error",
                    title: "ERORR!!!",
                    text: error.response,
                  });
                });
            }
            if (!!error) {
              //console.error(error);
            }
          }}
          style={{ width: "100%" }}
        />
      </Paper>
    </>
  );
};

export default Scaner;
