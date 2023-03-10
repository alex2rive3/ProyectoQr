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

const UserList = () => {
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
        const getData = async () => {
            const res = await axios.get(`http://localhost:8000/api/users`);
            setUser(res.data);
        };
        getData();
    }, []);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Usuario</StyledTableCell>
                        <StyledTableCell align="right">Correo</StyledTableCell>
                        <StyledTableCell align="right">Permiso</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {user.map((row) => (
                        <StyledTableRow key={row.userName}>
                            <StyledTableCell component="th" scope="row">
                                {row.userName}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.email}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.permit}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserList;
