import { API_AUTH_REGISTER } from "../constants.js";
import { headers } from "../headers.js";

export async function register({ name, email, password }) {
  
  const body = JSON.stringify({ name, email, password });

  try {
    const response = await fetch(API_AUTH_REGISTER, {
      headers: headers(),
      method: "POST",
      body,
    });

    if (response.ok) {
      const data = await response.json();
      const { accessToken: token, ...user } = data;

      // Store token and user info in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

    } else {
      const errorData = await response.json(); // Handle error response from API
      throw new Error(errorData.message || "Uh oh, something went wrong");
    }

  } catch (error) {
    console.error("An error occurred during registration:", error);
  }
}
