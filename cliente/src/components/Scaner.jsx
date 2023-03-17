import axios from "axios";
import { Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import Swal from "sweetalert2";
import MenuBar from "../layouts/Menu";
const Scaner = () => {
  const myStorage = window.localStorage;
  const [guarda, setGuarda] = useState(JSON.parse(myStorage.getItem("user")));
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
      </Paper>
    </>
  );
};

export default Scaner;
