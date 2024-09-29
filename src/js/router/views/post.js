// src/js/router/views/post.js

import { readPost } from "../../api/post/read.js";
import { authGuard } from "../../utilities/authGuard.js";

export default async function postRouter() {
  // Ensure only authenticated users can access this route
  authGuard();

  document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (postId) {
      try {
        const post = await readPost(postId);
        document.getElementById("title").textContent = post.title;
        document.getElementById("body").textContent = post.body;
        document.getElementById("tags").textContent = post.tags.join(", ");
      } catch (error) {
        console.error("Failed to load post:", error);
      }
    } else {
      console.error("Post ID not found in URL");
    }
  });
}
