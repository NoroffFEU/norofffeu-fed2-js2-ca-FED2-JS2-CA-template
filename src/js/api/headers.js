import { API_KEY } from "./constants";

export function headers() {
  const headers = new Headers();

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  if (localStorage.token) {
    const token = "Bearer " + JSON.parse(localStorage.getItem("token"));
    headers.append("Authorization", token);
  }
  headers.append("content-Type", "application/json");

  return headers;
}
