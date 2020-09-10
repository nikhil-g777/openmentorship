import axios from "axios";
import { useState } from "react";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
  withCredentials: true,
});

export const registerUser = (payload) => api.post("/users/register", payload);

export const updateUser = (payload) =>
  api.put(`/users/update/${payload._id}`, payload);

export const getUserInfo = (payload) => api.get(`/users/info/${payload._id}`);

export const getUserMatches = (payload) => {
  return api.get(`/users/matches/${payload._id}`);
};

// export const sendMessage = (payload) => {
//   api.put(`/users/matches/`)
// }

const apis = {
  registerUser,
  updateUser,
  getUserInfo,
  getUserMatches,
};

export default apis;
