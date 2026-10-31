import axios from "axios";

const baseURL = (
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL
)
  ?.trim()
  .replace(/\/+$/, "");

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function assertApiConfigured() {
  if (!baseURL) {
    throw new Error(
      "API URL is not configured. Set VITE_API_URL in the project .env file and restart the dev server.",
    );
  }
}

export default api;
