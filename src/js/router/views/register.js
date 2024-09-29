// src/js/router/views/register.js

import { onRegister } from "../../ui/auth/register.js";

export default async function registerRouter() {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    if (form) {
      form.addEventListener("submit", onRegister);
    } else {
      console.error("Register form not found");
    }
  });
}
