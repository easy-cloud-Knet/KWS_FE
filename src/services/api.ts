import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: "http://100.101.247.128:25121/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: Cookies.get("accessToken")
      ? `Bearer ${Cookies.get("accessToken")}`
      : undefined,
  },
});

export default axiosClient;
