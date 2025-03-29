import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: "http://223.194.20.119:25121/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: Cookies.get("accessToken") ? `Bearer ${Cookies.get("accessToken")}` : undefined,
  },
});

export default axiosClient;
