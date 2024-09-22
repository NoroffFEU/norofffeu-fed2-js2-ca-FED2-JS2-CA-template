import { onCreatePost } from "../../ui/post/create.js";

export default function postCreateView() {
  const form = document.querySelector('form[name="createPost"]');
  if (form) {
    form.addEventListener('submit', onCreatePost);
  } else {
    console.error("Create post form not found");
  }
}