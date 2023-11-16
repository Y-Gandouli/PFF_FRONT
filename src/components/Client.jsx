import React, { useEffect, useState } from "react";
import "./client.css";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:9001/clientsManagement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse du serveur:", data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });

    window.location.reload();
  };
  useEffect(() => {
    fetch("http://localhost:9001/userManagement", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setClients(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const handleSelectionModelChange = (selectionModel) => {
    console.log("Sélection des lignes a changé :", selectionModel);
    setSelectedRows(selectionModel);
    const selectedData = clientsData.filter((row) =>
      selectionModel.includes(row.id)
    );
    if (selectionModel.length !== 0) {
      setData(selectedData[0]);
      setIsUpdating(true);
    } else {
      setData({ id: "", name: "", email: "", phone: "" });
      setIsUpdating(false);
    }
    console.log("Données des lignes sélectionnées :", selectedData);
  };

  return (
    <div className="flexColumn">
      <h1>Clients Management</h1>
      <div className="flexRow" style={{ width: "50%" }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={clientsData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
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
              <Button variant="contained" type="submit">
                Delete client
              </Button>
              <Button variant="contained" type="submit">
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
