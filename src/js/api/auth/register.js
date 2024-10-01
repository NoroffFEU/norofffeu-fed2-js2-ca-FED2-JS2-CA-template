import { API_KEY, API_AUTH_REGISTER } from "../constants.js";

/**
 * Register a new user
 * @param {Object} param0
 * @param {string} param0.name - The user's name
 * @param {string} param0.email - The user's email
 * @param {string} param0.password - The user's password
 * @returns {Promise<Object>} - The response or error message
 */
export async function register({ name, email, password }) {
  if (!name || !email || !password) {
    alert("Please fill out all required fields.");
    return;
  }

  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error data:", data);
      const errorMessage = data.errors?.map(error => error.message).join(", ") || data.message;
      throw new Error(errorMessage || "Registration failed. Please try again.");
    }

    alert("Your registration was successful!");
    location.href = "./auth/login";
    return { ok: true, data };
  } catch (error) {
    console.error("Error:", error.message);
    alert(`Registration failed: ${error.message}. Please check your information and try again.`);
    return { ok: false, error: error.message };
  }
}
