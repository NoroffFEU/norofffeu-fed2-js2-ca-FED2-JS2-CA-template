import { APILoginRequest, APILoginResponse, APIError } from "@/types/types";
import { API_AUTH_LOGIN } from "@api/constants";

export async function login({ email, password }: APILoginRequest) {
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

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message || "Something went wrong logging in the user.";
      throw new Error(errorMessage);
    }
    const { data }: { data: APILoginResponse } = await response.json();
    const { accessToken: token, name } = data;
    localStorage.token = token;
    localStorage.userName = name;

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Login error:", error.message);
    } else {
      console.error("Unexpected error logging in:", error);
    }
  }
}
