import axios from "axios";

// export const BASE_URL = "http://8ae75f8a4a5e.ngrok.io/";
export const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
// export const BASE_URL = "http://8eedbc3c0ea1.ngrok.io/";

export function axiosClient() {
  let defaultOptions = {
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      accept: "application/json",
    },
  };

  let instance = axios.create(defaultOptions);

  // Set the AUTH token for an request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");

    config.headers.common = {
      authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    };
    return config;
  });

  // instance.defaults.headers.common[
  //   "Authorization"
  // ] = store.getState().mainStore.accessToken;

  return instance;
}

export default axiosClient;
