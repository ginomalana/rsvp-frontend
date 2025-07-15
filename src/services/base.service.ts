import axios from "axios";
import { ELocalStorageKeys } from "../enums/localstorage_keys";
const env = import.meta.env;

export const api = axios.create({
  baseURL: env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem(ELocalStorageKeys.User);
  if (user) {
    const { id } = JSON.parse(user);
    config.headers["User-Id"] = id;
  }
  return config;
});
