// src/js/router/views/auth.js

import { authGuard } from "../../utilities/authGuard.js";

export default async function authRouter(pathname = window.location.pathname) {
  // Ensure only unauthenticated users can access these routes
  authGuard(false);

  switch (pathname) {
    case "/auth/login/index.html":
      await import("/src/js/ui/auth/login.js");
      break;

    case "/auth/register/index.html":
      await import("/src/js/ui/auth/register.js");
      break;

    default:
      window.location.href = "/auth/login/index.html";
      break;
  }
}
