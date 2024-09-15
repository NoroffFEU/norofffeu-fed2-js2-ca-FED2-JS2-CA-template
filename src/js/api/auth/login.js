import { API_AUTH_LOGIN } from "../constants";
import { headers } from "../headers";

export async function login({ email, password }) {
  const body = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(body),
    });
    if (response.ok) {
      alert(`Successfully logged in"`);
      const data = await response.json();
      console.log("Data:", data.data.name);
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      localStorage.setItem("token", JSON.stringify(data.data.accessToken));
      window.location.href = "/";
    }
  } catch (error) {
    alert("Something went wrong trying to login");
    console.log(error);
  }
}
