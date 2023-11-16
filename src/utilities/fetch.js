export async function customFetch({ path, method, bodyData }) {
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (bodyData !== null) {
    requestOptions.body = JSON.stringify(bodyData);
  }

  return fetch(path, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log("Réponse du serveur:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}
