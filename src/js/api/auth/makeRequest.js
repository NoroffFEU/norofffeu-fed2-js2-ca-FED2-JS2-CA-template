import { getHeaders } from "../getHeaders";

export async function makeRequest(
  url,
  method = "GET",
  body = null,
  requireApiKey = false
) {
  try {
    // Get headers from the external function
    const headers = await getHeaders(requireApiKey);

    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      console.error("Response data:", data);
      throw new Error(
        data.errors ? data.errors[0].message : "An error occurred"
      );
    }

    return data;
  } catch (error) {
    console.error("Request error:", error.message);
    throw error;
  }
}
