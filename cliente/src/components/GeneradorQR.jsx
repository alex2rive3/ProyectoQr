import React, { useEffect, useState } from "react";
import moment from "moment";
import QRCode from "react-qr-code";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, Paper, Typography, Box } from "@mui/material";
import MenuBar from "../layouts/Menu";
axios.defaults.withCredentials = true;

const GereadorQR = () => {
  const myStorage = window.localStorage;
  const navigate = useNavigate();
  const [dia, setDia] = useState("");
  const [user, setUser] = useState({});
  const obtenerDia = async () => {
    const res = await moment().format("dddd");
    setDia(res);
  };
  const autorizado = (usuario) => {
    const { permit } = usuario;
    if (permit !== undefined) {
      if (permit !== "universitario") {
        navigate("/");
      }
    }
  };
  useEffect(() => {
    obtenerDia();
    setUser(JSON.parse(myStorage.getItem("user")));
  }, []);

  useEffect(() => {
    autorizado(user);
  }, [user]);
  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        margin: "0 auto",
        minHeight: "600px",
      }}
    >
      <Box sx={{ padding: "3px 5px" }}>
        <MenuBar />
        <Box sx={{ margin: "5px auto", width: "95%" }}>
          <Typography variant="h5">
            <strong>Codigo QR Universitario</strong>
          </Typography>
          <Typography variant="h6">
            Usuario <strong>{user.userName}</strong>
          </Typography>

          <Typography variant="body1">
            Utilice adecuadamente para que sigamos teniendo este veneficio tan
            importante
          </Typography>
        </Box>
        <div
          style={{
            height: "auto",
            margin: "15px auto",
            width: "95%",
          }}
        >
          {/* //Control para que el codigo solo se genere de Lunes a Viernes  */}
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
                value={`${user._id}`}
                viewBox={`0 0 256 256`}
              />
              <Alert severity="success">
                <strong>Codigo correspondiente al dia {dia}</strong>
              </Alert>
            </>
          ) : (
            <Alert severity="error">
              <strong>El dia de hoy no Tienes Boletos </strong>
            </Alert>
          )}
        </div>
      </Box>
    </Paper>
  );
};

export default GereadorQR;
