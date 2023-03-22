import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import FormUser from "../components/FormUser";
import { Paper, Typography } from "@mui/material";

const UpdateUser = () => {
  const navigate = useNavigate();
  const valorInicial = {
    userName: "",
    email: "",
    password: "",
    permit: "",
  };

  const [user, setUser] = useState(valorInicial);
  const { id } = useParams();
  // const autorizado = (usuario) => {
  //   const { permit } = usuario;
  //   if (permit !== undefined) {
  //     if (permit !== "administrador") {
  //       navigate("/");
  //     }
  //   }
  // };
  // useEffect(() => {
  //   autorizado(user);
  // }, [user]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`http://localhost:8000/api/getUser/${id}`);
      setUser(res.data);
    };

    getData();
  }, []);

  const actualizarUsuario = async (values, actions) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/update/${id}`,
        values
      );
      console.log(res);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "GENIAL!!!",
          text: `Se ha actualizado el usuario ${res.data.userName}!`,
        });

        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Ops que mal!!!",
        text: `Error: ${error?.response?.data?.message || error.message}`,
      });
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: "45%", padding: "10px 18px", margin: "0 auto" }}
    >
      <Typography
        variant="h5"
        sx={{ textAlign: "center", marginBottom: "8px" }}
      >
        Editar Usuario
      </Typography>
      <FormUser
        initialValues={user}
        botonTexto="Actualizar"
        onSubmit={actualizarUsuario}
      />
    </Paper>
  );
};

export default UpdateUser;
