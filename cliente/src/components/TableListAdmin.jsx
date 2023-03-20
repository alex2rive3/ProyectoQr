import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";

const columns = [
  {
    field: "generadorId",
    headerName: "Alumno",
    width: 150,
    valueGetter: (params) => params.value.userName,
  },
  {
    field: "lectorId",
    headerName: "Lector",
    width: 150,
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={{ width: "100%" }}>
      <div>
        <DataGrid
          autoHeight
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id} // usa el campo _id como identificador
        />
      </div>
    </div>
  );
};

export default TableListAdmin;
