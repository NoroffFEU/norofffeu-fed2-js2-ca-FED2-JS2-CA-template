// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose

import { findForm } from "@utilities/findForm";
import { onRegister } from "@ui/auth/register";
import { onLogin } from "@ui/auth/login";

export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      await import("@/js/router/views/home.js");
      break;
    case "/auth/":
      await import("@/js/router/views/auth.js");
      break;
    case "/auth/login/":
      const loginForm = findForm("login");
      if (loginForm instanceof HTMLFormElement) {
        loginForm.addEventListener("submit", onLogin);
      }
      break;
    case "/auth/register/":
      const registerForm = findForm("register");
      if (registerForm instanceof HTMLFormElement) {
        registerForm.addEventListener("submit", onRegister);
      }

      break;
    case "/post/":
      await import("@/js/router/views/post.js");
      break;
    case "/post/edit/":
      await import("@/js/router/views/postEdit.js");
      break;
    case "/post/create/":
      await import("@/js/router/views/postCreate.js");
      break;
    case "/profile/":
      await import("@/js/router/views/profile.js");
      break;
    default:
      await import("@/js/router/views/notFound.js");
  }
}
