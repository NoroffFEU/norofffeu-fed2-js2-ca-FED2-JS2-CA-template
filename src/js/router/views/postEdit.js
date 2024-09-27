import { onUpdatePost } from "../../ui/post/update";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const form = document.forms.editPost;

form.addEventListener("submit", onUpdatePost);
