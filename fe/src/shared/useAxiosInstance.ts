import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api/v1", // Fallback if env variable is missing
    headers: { "Content-Type": "application/json" },
});

export default instance;
