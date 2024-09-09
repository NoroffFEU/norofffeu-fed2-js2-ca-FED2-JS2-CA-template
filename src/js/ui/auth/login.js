import { login } from "../../api/auth/login";

export async function onLogin(event) {
  console.log(event);

  event.preventDefault();
  const formData = new FormData(event.target);
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  login(loginData);
}
