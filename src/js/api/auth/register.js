import { API_AUTH_REGISTER } from "../constants";

export async function register({
  name,
  email,
  password,
  bio,
  banner,
  avatar,
}) {
  const body = JSON.stringify({
    name,
    email,
    password,
    bio,
    banner,
    avatar,
  });

  const response = await fetch(API_AUTH_REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (response.ok) {
    const { data } = await response.json();
    const { accessToken: token,...user } = data;
    localStorage.token = token;
    localStorage.user = JSON.stringify(user);
    return data;
  }

  throw new Error("Couldn't register");
}
