import { API_KEY } from "./constants";

export function headers(userToken: string) {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("X-Noroff-API-Key", API_KEY);
  headers.append("Authorization", `Bearer ${userToken}`);

  return headers;
}
