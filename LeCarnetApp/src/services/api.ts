import axios from "axios";

//used for exercise, app & sets services

const API_URL = 'http://127.0.0.1:8055/';

const api = axios.create({
    baseURL: API_URL
  });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
