import axios from "axios";
import { getCookie } from "cookies-next";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getCookie("accessToken")}`
  },
});

// Add a request interceptor to include tokens (if needed)
axiosInstance.interceptors.request.use(
  (config) => {
    if (getCookie("accessToken")) {
      config.headers.Authorization = `Bearer ${getCookie("accessToken")}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;