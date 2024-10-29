import { makeHeader } from "../../ui/global/header";
import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";

const runPage = () => {
  authGuard();
  const header = document.querySelector("header");
  makeHeader(header);

  const form = document.forms.createPost;

  form.addEventListener("submit", onCreatePost);
};

runPage();
