import { API_AUTH_REGISTER } from "../constants";
import { headers } from "../headers";

export async function register({ name, email, password }) {
  const body = {
    name: name,
    email: email,
    password: password,
    venueManager: true,
  };

  console.log("Body:", body, name);

  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(body),
    });
    if (response.ok) {
      alert(`Successfully created user "${name}"`);
      window.location.href = "/auth/login/";
    }
  } catch (error) {
    alert("Something went wrong trying to register an account");
    console.log(error);
  }
}
