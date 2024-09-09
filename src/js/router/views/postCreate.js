import { onLogout } from "../../ui/auth/logout";
import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const form = document.forms["createPost"];

form.addEventListener("submit", onCreatePost);

const logoutButton = document.querySelector(".logout-button");
logoutButton.addEventListener("click", onLogout);
