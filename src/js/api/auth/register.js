import { API_AUTH_REGISTER } from "../constants";
import { makeRequest } from "./makeRequest";

export async function register({ name, email, password }) {
  const formData = {
    name,
    email,
    password,
  };

  try {
    const response = await makeRequest(
      API_AUTH_REGISTER,
      "POST",
      formData,
      false
    );

    // Check if the response data contains the expected fields
    if (response && response.data) {
      console.log("Registration successful:", response.data);
      return response.data; // Successfully return the user data
    } else {
      console.log("Unexpected response structure:", response);
      throw new Error("Registration failed: Unexpected response structure");
    }
  } catch (error) {
    console.log("Error during registration:", error.message);
    throw error; // Rethrow the error for handling in onRegister
  }
}
