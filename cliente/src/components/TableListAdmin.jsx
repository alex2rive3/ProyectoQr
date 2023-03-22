import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { Box, Button, Paper, Typography } from "@mui/material";

const columns = [
  {
    field: "generadorId",
    headerName: "Universitario",
    width: 200,
    valueGetter: (params) => params.value.userName,
  },
  {
    field: "lectorId",
    headerName: "Lector",
    width: 200,
    valueGetter: (params) => params.value.userName,
  },
  {
    field: "createdAt",
    headerName: "Escaneo",
    width: 200,
    valueFormatter: (params) => moment(params.value).fromNow(), // usa moment para formatear la fecha
  },
];

const TableListAdmin = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const today = new Date();
    const lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );

    const response = await axios.get(
      `http://localhost:8000/api/filter?startDate=${lastWeek.toISOString()}&endDate=${today.toISOString()}`
    );
    setData(response.data);
  };
  const MonthFilter = async () => {
    const today = new Date();
    const lastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    const response = await axios.get(
      `http://localhost:8000/api/filter?startDate=${lastMonth.toISOString()}&endDate=${today.toISOString()}`
    );
    setData(response.data);
  };

  const DayFilter = async () => {
    const fechaInicio = new Date(); // fecha de inicio de la consulta
    const fechaFin = new Date(); // fecha de fin de la consulta
    //Seteamos las horas para hacer un contador diario
    fechaInicio.setHours(4, 30, 0, 0); //4:30 del dia
    fechaFin.setHours(23, 30, 0, 0); //23:30 del mismo dia
    const response = await axios.get(
      `http://localhost:8000/api/filter?startDate=${fechaInicio.toISOString()}&endDate=${fechaFin.toISOString()}`
    );
    setData(response.data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Paper sx={{ minWidth: 720, padding: "10px 18px" }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">Lista de Qr</Typography>
        <Box display="flex" alignItems="center" gap="5px">
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              MonthFilter();
            }}
          >
            Listado del Mes
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              getData();
            }}
          >
            Listado de la Semana
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              DayFilter();
            }}
          >
            Listado del Día
          </Button>
        </Box>
      </Box>
      <div>
        <DataGrid
          sx={{ height: "400px" }}
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id} // usa el campo _id como identificador
        />
      </div>
    </Paper>
  );
};

export default TableListAdmin;
