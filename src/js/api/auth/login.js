import { API_AUTH_LOGIN } from "../constants";
import { makeRequest } from "./makeRequest";

export async function login({ email, password }) {
  const formData = {
    email,
    password,
  };
  try {
    const response = await makeRequest(API_AUTH_LOGIN, "POST", formData, false);
    return response;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error; // Rethrow the error to be caught in onLogin
  }
}
