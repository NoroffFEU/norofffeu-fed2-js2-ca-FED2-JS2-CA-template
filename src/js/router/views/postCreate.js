import { onCreatePost } from "../../ui/post/createPost.js";
import { authGuard } from "../../utilities/authGuard.js";

authGuard();

const form = document.forms.createPost;

form.addEventListener("submit", onCreatePost);
