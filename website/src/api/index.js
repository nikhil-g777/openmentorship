import axios from "axios";
import { useState } from "react";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
  withCredentials: true,
});

const getToken = () => JSON.parse(localStorage.getItem("tokens"));

export const loginUser = (payload) => api.post("/users/login", payload);

export const registerUser = (payload) => api.post("/users/register", payload);

export const updateUser = (payload) => {
  return api.put(`/users/update/${payload._id}`, payload, {
    headers: { authorization: `Bearer ${getToken()}` },
  });
};

export const getUserInfo = (payload) => {
  return api.get(`/users/info/${payload._id}`, {
    headers: { authorization: `Bearer ${getToken()}` },
  });
};

export const getUserMatches = (payload) => {
  return api.get(`/users/matches/${payload._id}`, {
    headers: { authorization: `Bearer ${getToken()}` },
  });
};

// export const sendMessage = (payload) => {
//   api.put(`/users/matches/`)
// }

const apis = {
  loginUser,
  registerUser,
  updateUser,
  getUserInfo,
  getUserMatches,
};

export default apis;
