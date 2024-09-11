import NoroffApp from "../../ui";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const form = document.forms["createPost"];

form.addEventListener("submit", NoroffApp.events.post.create);

const logoutButton = document.querySelector(".logout-button");
logoutButton.addEventListener("click", NoroffApp.events.logout);
