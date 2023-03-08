import axios from "axios";
import Config from "src/Config";

const axiosInstance = axios.create({
  baseURL: Config.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Basic ${token}`;
  }
  return config;
});

export { axiosInstance as axios };