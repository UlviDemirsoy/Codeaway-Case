import axios from "axios";
//const BASE_URL = "http://localhost:8080";
const BASE_URL = "https://backendapi-a352piz6wq-uc.a.run.app"

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: "include",
});
