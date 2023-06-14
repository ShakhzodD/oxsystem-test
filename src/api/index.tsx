import axios from "axios";
// import { store } from "store";
// import config from "config";
// import storage from "services/storage";

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
    // if (storage.get("token")) {
    configs.headers.Authorization = `Bearer ${window.localStorage.getItem(
      "token"
    )}`;
    // }
    return configs;
  },
  error => {
    // console.log("SERVICES REQUEST ERROR", error?.request);
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
