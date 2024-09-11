import { API_KEY } from "./constants";

export function headers() {
  const headers = new Headers();

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  const test = "Bearer " + JSON.parse(localStorage.getItem("token"));

  console.log(test);

  if (localStorage.token) {
    headers.append("Authorization", test);
  }
  headers.append("content-Type", "application/json");

  return headers;
}
