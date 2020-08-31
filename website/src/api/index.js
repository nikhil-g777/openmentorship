import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
  withCredentials: true,
});

export const registerUser = (payload) => api.post("/users/register", payload);

export const updateUser = (payload) =>
  api.put(`/users/update/${payload._id}`, payload);

const apis = {
  registerUser,
  updateUser,
};

export default apis;
