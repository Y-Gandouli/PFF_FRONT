import React, { useEffect, useState } from "react";
import "./client.css";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { customFetch } from "../utilities/fetch";
import { Await } from "react-router-dom";

const inputs = ["name", "email", "phone"];
const clientsData = [
  {
    id: 1,
    name: "hamid",
    email: "hamid@gmail.com",
    phone: "0661522435",
  },
  {
    id: 2,
    name: "souad",
    email: "souad@gmail.com",
    phone: "0661526876",
  },
  {
    id: 3,
    name: "youssef",
    email: "youssef@gmail.com",
    phone: "0661569766",
  },
  {
    id: 4,
    name: "said",
    email: "said@gmail.com",
    phone: "0661589769",
  },
];
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: true,
  },
  {
    field: "phone",
    headerName: "phoneNumber",
    type: "number",
    width: 110,
    editable: true,
  },
];

function Client() {
  const [clients, setClients] = useState([]);
  const [data, setData] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    customFetch({
      path: "https://52.154.77.66:3000/clientsManagement",
      method: "POST",
      bodyData: data,
    }).then((data) => {
      window.location.reload();
    });
  };
  useEffect(() => {
    customFetch({
      path: "https://52.154.77.66:3000/clientsManagement",
      method: "GET",
    }).then((clients) => {
      setClients(clients);
    });
  }, []);
  const handleSelectionModelChange = (selectionModel) => {
    console.log("Sélection des lignes a changé :", selectionModel);
    setSelectedRows([selectionModel]);
    console.log(selectedRows);
    const selectedData = clients.filter((row) =>
      selectionModel.includes(row.id)
    );
    if (selectionModel.length !== 0) {
      console.log(data);
      setData(selectedData[0]);
      setIsUpdating(true);
    } else {
      console.log(data);
      setData({ id: "", name: "", email: "", phone: "" });
      setIsUpdating(false);
    }
    console.log("Données des lignes sélectionnées :", selectedData);
  };

  const handleDelete = async (e) => {
    console.log(JSON.stringify({ ids: selectedRows }));

    customFetch({
      path: "https://52.154.77.66:3000/clientsManagement",
      method: "DELETE",
      bodyData: { ids: selectedRows },
    }).then(() => {
      window.location.reload();
    });
  };
  const handleUpdate = async (e) => {
    console.log(JSON.stringify(selectedRows[0]));

    customFetch({
      path: `https://52.154.77.66:3000/clientsManagement/${selectedRows[0]}`,
      method: "PUT",
      bodyData: data,
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="flexColumn">
      <h1>Clients Management</h1>
      <div className="flexRow" style={{ width: "50%" }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={clients}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            editMode={false}
            pageSizeOptions={[5]}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionModelChange}
          />
        </Box>

        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            "& > :not(style)": { m: 1, width: "25ch" },
            "& button ": { m: 2 },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {inputs.map((input, index) => (
            <TextField
              key={index}
              id="outlined-basic"
              label={input}
              variant="outlined"
              onChange={(e) => setData({ ...data, [input]: e.target.value })}
              value={data[input]}
              focused={Boolean(selectedRows.length !== 0)}
            />
          ))}

          {isUpdating ? (
            <>
              <Button variant="contained" onClick={handleDelete}>
                Delete client
              </Button>
              <Button variant="contained" onClick={handleUpdate}>
                Update client
              </Button>
            </>
          ) : (
            <Button variant="contained" type="submit">
              Add new client
            </Button>
          )}
        </Box>
      </div>
    </div>
  );
}

export default Client;
