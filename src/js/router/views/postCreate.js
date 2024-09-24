import { onCreatePost, populateCreatePostForm } from "../../ui/post/create.js";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const form = document.forms.createPost;
populateCreatePostForm();
form.addEventListener("submit", onCreatePost);
