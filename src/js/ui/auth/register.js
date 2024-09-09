import { register } from "../../api/auth/register";

export async function onRegister(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const registerData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  register(registerData);
}
