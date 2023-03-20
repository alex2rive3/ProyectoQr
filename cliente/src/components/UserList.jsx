import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import DeleteButton from "./DeleteButton";
import { Link } from "react-router-dom";

const UserList = ({ act }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const [user, setUser] = useState([]);
  useEffect(() => {
    const getAllData = async () => {
      const res = await axios.get(`http://localhost:8000/api/users`);
      setUser(res.data);
    };
    getAllData();
  }, [act]);
  const quitarUser = (userID) => {
    setUser(user.filter((usuario) => usuario._id !== userID));
  };
  return (
    <Paper sx={{ minWidth: 720, padding: "10px 18px" }}>
      <Typography variant="h5">Lista de Usuarios</Typography>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 720, maxHeight: "400px", overflowY: "scroll" }}
      >
        <Table sx={{ maxWidth: 720 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Usuario</StyledTableCell>
              <StyledTableCell align="right">Correo</StyledTableCell>
              <StyledTableCell align="right">Permiso</StyledTableCell>
              <StyledTableCell align="center">Funciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((row) => (
              <StyledTableRow key={row.userName}>
                <StyledTableCell component="th" scope="row">
                  {row.userName}
                </StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.permit}</StyledTableCell>
                <StyledTableCell>
                  <Button variant="contained" color="primary">
                    <Link to={`/user/${row._id}`}>Editar</Link>
                  </Button>
                  <DeleteButton
                    id_user={row._id}
                    successCallback={quitarUser}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserList;
