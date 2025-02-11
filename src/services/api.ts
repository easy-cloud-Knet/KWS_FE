import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://223.194.20.119:25121/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
