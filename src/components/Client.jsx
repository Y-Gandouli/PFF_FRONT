import React, { useEffect, useState } from "react";
import "./client.css";

const inputs = ["name", "email", "phone"];

function Client() {
  const [clients, setClients] = useState([]);
  const [data, setData] = useState({});
  //const [isAdd, setIsAdd]=useState(false)
  console.log(data);
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
        setClients([...Client]);
        console.error("Erreur lors de la requête:", error);
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

  return (
    <div className="flexColumn">
      <h2>Clients list</h2>
      <div className="flexRow" style={{ width: "50%" }}>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>phone</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <div className="flexColumn">
                <label htmlFor={input}>{input}</label>
                <input
                  type="text"
                  id={input}
                  onChange={(e) =>
                    setData({ ...data, [input]: e.target.value })
                  }
                  value={data[input]}
                />
              </div>
            ))}
            <button type="submit">Ajouter</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Client;
