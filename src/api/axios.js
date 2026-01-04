import axios from "axios";

// Change this to your backend later
const API = axios.create({
  baseURL: "https://backend-ecommerce-api-87rv.onrender.com/api",
  // baseURL: "http://localhost:5000/api",

});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
