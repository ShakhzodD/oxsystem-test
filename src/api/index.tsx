import axios from "axios";
// import config from 'config'
// import { storage } from 'services'

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
  timeout: 30000, // 30 seconds then error
});

api.defaults.params = {};
api.defaults.params["_f"] = "json";
// api.defaults.params["_l"] = store.getState().system.currentLangCode;
api.defaults.headers.common["Accept"] = "application/json";
api.defaults.headers.common["Cache-Control"] = "no-cache";
api.defaults.headers.common["Content-Type"] = "application/json; charset=utf-8";

api.interceptors.request.use(
  configs => {
    console.log(configs);
    const token = window.localStorage.getItem("token");
    configs.headers.Authorization = `Bearer ${token}`;
    return configs;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default api;
