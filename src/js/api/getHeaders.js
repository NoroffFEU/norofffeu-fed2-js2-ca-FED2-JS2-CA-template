import { getKey } from "./auth/key";
import { API_KEY } from "./constants";

export async function getHeaders(requireApiKey = false) {
  const headers = {
    "Content-Type": "application/json",
  };

  // Retrieve the access token
  const accessToken = await getKey("accessToken");

  // Add Authorization header if token is available
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  } else if (requireApiKey) {
    throw new Error("Access token is required but is missing.");
  }

  // Add API Key if required
  if (requireApiKey && API_KEY) {
    headers["X-Noroff-API-Key"] = API_KEY;
  }

  return headers;
}
