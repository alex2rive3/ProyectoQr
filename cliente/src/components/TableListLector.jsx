import { useState, useEffect } from "react";
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

const TableList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:8000/api/qr");
      setData(response.data);
    };

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
      <div>
        <h2>Total hoy:</h2>
      </div>
      <div>
        <p>Escaneados: {data.length} alumnos</p>
      </div>
    </div>
  );
};

export default TableList;
