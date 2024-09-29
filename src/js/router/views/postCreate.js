// src/js/router/views/postCreate.js

import { createPost } from "/src/js/api/post/create.js";
import { authGuard } from "/src/js/utilities/authGuard.js";

export default async function postCreateRouter() {
  // Ensure only authenticated users can access this route
  authGuard();

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.forms.createPost;
    if (form) {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const postData = Object.fromEntries(data.entries());
        try {
          const newPost = await createPost(postData);
          window.location.href = `/post/index.html/?id=${newPost.id}`;

        } catch (error) {
          console.error("Failed to create post:", error);
        }
      });
    } else {
      console.error("Create Post form not found");
    }
  });
}
