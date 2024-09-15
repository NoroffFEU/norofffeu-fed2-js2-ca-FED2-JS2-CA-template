import { onLogout } from "../auth/logout";

export function setLogoutListener() {
  const logoutButton = document.querySelectorAll(".logout");

  logoutButton.forEach((button) => {
    button.addEventListener("click", onLogout);
  });
}
