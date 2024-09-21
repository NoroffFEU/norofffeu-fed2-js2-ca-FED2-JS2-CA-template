import { initializeAPI } from "./constants";
import { getCurrentUser } from "../utilities/currentUser";

export function headers() {
  const headers = new Headers();
  const {token} = getCurrentUser();

  if (initializeAPI) {
    headers.append("X-Noroff-API-Key", initializeAPI);
  }
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  return headers;
}
