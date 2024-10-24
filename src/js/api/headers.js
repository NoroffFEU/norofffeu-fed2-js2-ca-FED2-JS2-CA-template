import { API_KEY, getAuthToken } from "./constants";

export function headers() {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  const AUTH_TOKEN = getAuthToken();
  if (AUTH_TOKEN) {
    headers.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  }

  return headers;
}
