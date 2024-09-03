import { authGuard } from "../../utilities/authGuard";
import { onLogout } from "../../ui/auth/logout";
authGuard();

const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", onLogout);



