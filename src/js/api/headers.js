import { API_KEY } from "./constants";

export function headers() {
  const headers = new Headers();
  // Add API key to headers if it exists
  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }
  // Add content type to headers for JSON
  headers.append("Content-Type", "application/json");

  // Add Authorization header if token exists in local storage
  if (localStorage.getItem("token")) {
    headers.append("Authorization", "Bearer " + localStorage.getItem("token"));
  }

  return headers;
}
