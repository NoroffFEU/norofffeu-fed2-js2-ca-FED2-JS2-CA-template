// src/js/router/views/login.js

import { onLogin } from "../../ui/auth/login.js";

export default async function loginRouter() {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    if (form) {
      form.addEventListener("submit", onLogin);
    } else {
      console.error("Login form not found");
    }
  });
}