import { getKey } from "./auth/key";
import { API_AUTH_KEY, API_KEY } from "./constants";

export async function getHeaders(requireApiKey = false) {
  const headers = {
    "Content-Type": "application/json",
  };

  // Retrieve the access token
  const accessToken = await getKey("token");

  // Add Authorization header if token is available
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  } else if (requireApiKey) {
    throw new Error("Access token is required but is missing.");
  }

  // Add API Key if required
  if (requireApiKey && API_AUTH_KEY) {
    headers["X-Noroff-API-Key"] = API_KEY;
  }

  return headers;
}
