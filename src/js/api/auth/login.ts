import { APILogin } from "../../../types/types";
import { API_AUTH_LOGIN } from "../constants";

export async function login({ email, password }: APILogin) {
  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data?.errors?.[0]?.message ||
        "Something went wrong logging in the user.";
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Login error:", error.message);
    } else {
      console.error("Unexpected error logging in:", error);
    }
  }
}
