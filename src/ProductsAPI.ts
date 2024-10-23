const api: string = "http://localhost:3000/api";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
};

export const getAll = () =>
  fetch(`${api}/products`, { headers })
    .then((res) => res.json())
    .then((data) => data.results);

export const searchProducts = async (query: string) =>
  fetch(`${api}/products/search?term=${query}`, { headers })
    .then((res) => res.json())
    .then((data) => data.results);

/*   fetch(`${api}/products/search`, {
    method: "GET",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ term: query, maxResults }),
  })
    .then((res) => res.json())
    .then((data) => data); */
