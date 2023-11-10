import React, { /*useEffect,*/ useState } from "react";
//mport axios from "axios";

function Client() {
  const [clients /*,setClients*/] = useState([]);
  /*
  useEffect(() => {
    // Fetch the list of clients from your API endpoint when the component mounts
    axios
      .get("/api/clients")
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, []);
  */

  // Add, Update, and Delete functionality can be added here, using other API endpoints.

  return (
    <div>
      <h2>Clients</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add, Update, and Delete functionality can be added here. */}
    </div>
  );
}

export default Client;
