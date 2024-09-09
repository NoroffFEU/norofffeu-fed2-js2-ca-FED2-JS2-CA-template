import { APIRegister } from "../../../types/types";
import { API_AUTH_REGISTER } from "../constants";

export async function register({ name, email, password }: APIRegister) {
  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data?.errors?.[0]?.message ||
        "Something went wrong registering the user.";
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Registration error:", error.message);
    } else {
      console.error("Unexpected error registering user:", error);
    }
  }
}
