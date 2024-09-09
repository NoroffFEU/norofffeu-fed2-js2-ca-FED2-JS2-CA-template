import { onLogin } from "../../ui/auth/login";

const form = document.forms.namedItem("login");

if (form) {
  form.addEventListener("submit", onLogin);
}
