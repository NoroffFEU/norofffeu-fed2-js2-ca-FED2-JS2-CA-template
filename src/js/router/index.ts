// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose

import { findForm } from "@utilities/findForm";
import { onRegister } from "@ui/auth/register";
import { onLogin } from "@ui/auth/login";
import { onCreatePost } from "@ui/post/create";
import { onUpdatePost } from "@ui/post/update";

export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      await import("@/js/router/views/auth");
      break;
    case "/home/":
      await import("@/js/router/views/home");
      break;
    case "/login/":
      const loginForm = findForm("login");
      if (loginForm instanceof HTMLFormElement) {
        loginForm.addEventListener("submit", onLogin);
      }
      break;
    case "/register/":
      const registerForm = findForm("register");
      if (registerForm instanceof HTMLFormElement) {
        registerForm.addEventListener("submit", onRegister);
      }

      break;
    case "/post/":
      await import("@/js/router/views/post");
      break;
    case "/post/edit/":
      await import("@/js/router/views/postEdit");
      const editPostForm = findForm("editPost");
      if (editPostForm instanceof HTMLFormElement) {
        const formTitleInput = editPostForm.elements.namedItem(
          "title"
        ) as HTMLInputElement;
        formTitleInput.focus();
        editPostForm.addEventListener("submit", onUpdatePost);
      }
      break;
    case "/post/create/":
      const createPostForm = findForm("createPost");
      if (createPostForm instanceof HTMLFormElement) {
        const formTitleInput = createPostForm.elements.namedItem(
          "title"
        ) as HTMLInputElement;
        formTitleInput.focus();
        createPostForm.addEventListener("submit", onCreatePost);
      }
      break;
    case "/profile/":
      await import("@/js/router/views/profile");
      break;
    default:
      await import("@/js/router/views/notFound");
  }
}
