import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

/* Equivalent if using Fetch API 
const get = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Response failed with status message ${response.status}, ${error}`
    );
  }
  const data = await response.json();
  return data;
};
*/

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}`);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, create, update, remove, setToken };
