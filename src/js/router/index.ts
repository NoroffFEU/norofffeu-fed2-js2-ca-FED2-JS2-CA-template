// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose

import { findForm } from "@utilities/findForm";
import { onRegister } from "@ui/auth/register";
import { onLogin } from "@ui/auth/login";

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
      break;
    case "/post/create/":
      await import("@/js/router/views/postCreate");
      break;
    case "/profile/":
      await import("@/js/router/views/profile");
      break;
    default:
      await import("@/js/router/views/notFound");
  }
}
