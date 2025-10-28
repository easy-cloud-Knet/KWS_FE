import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: "https://doddle.kr:25121/api",
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
