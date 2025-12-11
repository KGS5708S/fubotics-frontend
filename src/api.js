// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api'
});

API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default API;
