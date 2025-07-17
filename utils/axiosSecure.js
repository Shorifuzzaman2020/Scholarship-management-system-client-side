// utils/axiosSecure.js
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://your-server.com",
});

axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosSecure;


// import axiosSecure from "../utils/axiosSecure";

// const { data } = await axiosSecure.get(`/users/${user.email}`);
