// src/js/router/views/profile.js

import { readProfile } from "../../api/profile/index.js";
import { authGuard } from "../../utilities/authGuard.js";

export default async function profileRouter() {
  // Ensure only authenticated users can access this route
  authGuard();

  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.name) {
        const profile = await readProfile(user.name);
        document.getElementById("username").textContent = profile.name;
        document.getElementById("email").textContent = profile.email;
      } else {
        console.error("User data not found in local storage");
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  });
}
