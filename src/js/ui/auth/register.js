import { register } from "../../api/auth/register";
/**
 * Fetch Register form data and run the fetch call aka. Register a user
 * @param {object} event
 * @example
 * ```js
 * form.addEventListener("submit", onRegister)
 * ```
 */
export async function onRegister(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const registerData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  register(registerData);
}
