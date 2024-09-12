import NoroffApp from "../../ui";
import { authGuard } from "../../utilities/authGuard";

authGuard();

NoroffApp.events.post.update();

const logoutButton = document.querySelector(".logout-button");
logoutButton.addEventListener("click", NoroffApp.events.logout);