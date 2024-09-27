import { API_KEY } from "./constants";

export function headers() {
  const headers = new Headers();

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  headers.append("Content-Type", "application/json");

  if (localStorage.getItem("token")) {
    headers.append("Authorization", "Bearer " + localStorage.getItem("token"));
  }


  return headers;
}
