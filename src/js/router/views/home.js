// src/js/router/views/home.js

import { authGuard } from "../../utilities/authGuard.js";
import { listPosts } from "../../ui/post/list.js";

export default async function homeRouter() {
  // Ensure only authenticated users can access this route
  authGuard();

  // Load and display recent posts
  document.addEventListener("DOMContentLoaded", () => {
    listPosts();
  });
}
