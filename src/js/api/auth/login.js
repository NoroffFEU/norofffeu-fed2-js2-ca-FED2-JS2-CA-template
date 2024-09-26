import { API_AUTH_LOGIN } from "../constants.js";
import { headers } from "../headers.js";

export async function login({ email, password }) {
  try {
    const response = await fetch(API_AUTH_LOGIN, {
      headers: headers(),
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const { accessToken: token, ...user } = data;

      console.log(token);

      // Store token and user info in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return data;
    } else {
      const errorData = await response.json(); // Handle error response from API
      throw new Error(errorData.message || "Uh oh, something went wrong");
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
  }
  throw new Error("Login failed");
}
