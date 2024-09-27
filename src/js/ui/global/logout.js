import { onLogout } from "../auth/logout";

/**
 * Reacts when someone clicks the logout button - then proceeds to run the logout function
 * @example
 * ```js
 * setLogoutListener()
 * ```
 */
export function setLogoutListener() {
  const logoutButton = document.querySelectorAll(".logout");

  logoutButton.forEach((button) => {
    button.addEventListener("click", onLogout);
  });
}
