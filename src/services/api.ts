import axios from "axios";
import Cookies from "js-cookie";

const API_DOMAIN = import.meta.env.API_DOMAIN;

const axiosClient = axios.create({
  baseURL: `https://${API_DOMAIN}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken") || "";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
