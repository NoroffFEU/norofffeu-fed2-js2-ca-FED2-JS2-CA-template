import { setLogoutListener } from "../../ui/global/logout";
import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";

const form = document.forms.createPost;

form.addEventListener("submit", onCreatePost);

authGuard();

setLogoutListener()
