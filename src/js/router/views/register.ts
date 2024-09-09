import { onRegister } from "../../ui/auth/register";

const form = document.forms.namedItem("register");

if (form) {
  form.addEventListener("submit", onRegister);
}
