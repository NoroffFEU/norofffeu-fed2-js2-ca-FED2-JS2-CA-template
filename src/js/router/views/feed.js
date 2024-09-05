import { onLogout } from "../../ui/auth/logout";

const logoutButton = document.querySelector(".logout-button");
logoutButton.addEventListener("click", onLogout);