// src/js/api/headers.js

import { API_KEY } from "/src/js/api/constants.js"; // Ensure API_KEY is imported from constants

export function headers(includeAuth = false) { // Changed parameter name to includeAuth
  const headers = new Headers();

  // Always include the API key in the headers
  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  } else {
    console.error("API_KEY is missing in headers.js");
  }

  // Include Authorization header if a token is present in localStorage and `includeAuth` is true
  const token = localStorage.getItem("token");
  if (includeAuth && token) {
    headers.append("Authorization", `Bearer ${token}`);
  } else if (includeAuth) { // Only log this if includeAuth is true
    console.error("Authorization token is missing in localStorage");
  }

  // Include Content-Type header for JSON body if necessary
  headers.append("Content-Type", "application/json");

  return headers;
}
