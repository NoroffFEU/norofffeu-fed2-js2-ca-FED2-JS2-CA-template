import { login } from "../../api/auth/login";
import { API_AUTH_LOGIN } from "../../api/constants";

export async function onLogin(event) {
  event.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  let email = emailInput.value;
  let password = passwordInput.value;

  const user = {
    email : email,
    password : password
  }

  emailInput.value = "";
  passwordInput.value = "";

  try {
    await login(API_AUTH_LOGIN, user);
  } catch(error) {
    alert(error.message);
  }
}
