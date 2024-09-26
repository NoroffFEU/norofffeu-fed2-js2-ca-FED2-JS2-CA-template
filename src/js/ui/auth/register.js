// src/ui/auth/register.js
import { register } from "../../api/auth/register";

export async function onRegister(event) {
  event.preventDefault();

  alert("ui register");

  const form = event.target;
  const formData = new FormData(form);

  console.log(formData);

  const user = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (user.password !== formData.get("confirmPassword")) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await register(user);
    if (response.ok) {
      alert("Registration successful");
      window.location.href = "/auth/login/";
    } else {
      const res = await response.json();
      if (res.errors.length > 0) {
        res.errors.forEach((err) => {
          alert(err.message);
        });
      }
    }
  } catch (error) {
    alert(`Registration failed: ${error}`);
  }
}
