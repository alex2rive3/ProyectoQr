import { Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddUser from "./AddUser";
import UserList from "../components/UserList";
import { Button, Typography } from "@mui/material";
import MenuBar from "../layouts/Menu";
import { useNavigate } from "react-router-dom";
import TableListAdmin from "../components/TableListAdmin";
const Admin = () => {
  const myStorage = window.localStorage;
  const navigate = useNavigate();
  const [showList, setShowList] = useState(true);
  const [actualizar, setActualizar] = useState();
  const [user, setUser] = useState({});
  const autorizado = (usuario) => {
    const { permit } = usuario;
    if (permit !== undefined) {
      if (permit !== "administrador") {
        navigate("/");
      }
    }
  };
  useEffect(() => {
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
      <Box sx={{ padding: "0px 15px" }}>
        <MenuBar />
        <Box>
          <Typography
            variant="h3"
            sx={{ textAlign: "center", margin: "10px 0px" }}
          >
            Panel de Administrador
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="flex-start">
          <Box
            flexDirection="column"
            display="flex"
            flex="1"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
          >
            <AddUser setAct={setActualizar} />
          </Box>
          <Box
            flex="3"
            flexDirection="column"
            display="flex"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
          >
            {/* mostrar lista de usuarios o listado de qr */}
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                setShowList(!showList);
              }}
            >
              {showList ? "Mostrar Lista de Qr" : "Mostrar Lista de Usuarios"}
            </Button>
            {showList ? <UserList act={actualizar} /> : <TableListAdmin />}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default Admin;
