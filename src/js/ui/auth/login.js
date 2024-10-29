import { login } from "../../api/auth/login";

/**
 * Fetch login form data and run the fetch call aka. login
 * @param {object} event
 * @example
 * ```js
 * form.addEventListener("submit", onLogin)
 * ```
 */

export async function onLogin(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  await login(loginData);
}
