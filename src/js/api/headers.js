// src/js/api/headers.js

import { API_KEY } from "/src/js/api//constants.js";  // Ensure API_KEY is imported from constants

export function headers(body = false) {
  const headers = new Headers();

  // Always include the API key in the headers
  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  } else {
    console.error("API_KEY is missing in headers.js");
  }

  // Include Authorization header if a token is present in localStorage
  const token = localStorage.getItem("token");
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  } else {
    console.error("Authorization token is missing in localStorage");
  }

  // Include Content-Type header for JSON body if necessary
  if (body) {
    headers.append("Content-Type", "application/json");
  }

  return headers;
}
