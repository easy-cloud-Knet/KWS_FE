import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: "http://kws-control:25121/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: Cookies.get("accessToken")
      ? `Bearer ${Cookies.get("accessToken")}`
      : undefined,
  },
});

export default axiosClient;
