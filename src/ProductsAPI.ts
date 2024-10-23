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

export const searchAndFilterProducts = async (
  query: string,
  minPrice?: number,
  maxPrice?: number
) =>
  fetch(
    `${api}/products/filter?term=${query}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
    {
      headers,
    }
  )
    .then((res) => res.json())
    .then((data) => data.results);
