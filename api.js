
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const fetchQueries = () => API.get("/queries");

export const analyzeQuery = (query) =>
  API.post("/analyze", { query });
