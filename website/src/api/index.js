import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
});

const getToken = () => JSON.parse(localStorage.getItem("token"));

//---------------------User APIs---------------------

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

//---------------------Session APIs---------------------

export const getSessions = () => {
  return api.get(`/sessions/sessionList`, {
    headers: { authorization: `Bearer ${getToken()}` },
  });
};

export const registerWaitlist = (payload) => {
  return api.post(`/waitlist/register`, payload);
};
