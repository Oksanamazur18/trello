import axios from "axios";
import { api } from "../common/constants";

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupInterceptors = (setProgress: (progress: number) => void) => {

  instance.interceptors.request.use((config) => {
    setProgress(0);
    const token = localStorage.getItem("token");
    if (token && !config.url?.includes("/login") && !config.url?.includes("/user")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      setProgress(100);
      return response;
    },
    (error) => {
      if (error.response?.status === 401 || error.response?.status === 404) {
        localStorage.removeItem("token");
        window.location.href = "/trello/auth?error=not_found";
      }
      setProgress(0);
      return Promise.reject(error);
    }
  );
};

export default instance;
