// src/js/router/views/postEdit.js
import { readPost, updatePost } from "../../api/post/read.js"; // Ensure these functions are imported correctly
import { authGuard } from "../../utilities/authGuard.js";

export default async function postEditRouter() {
  // Ensure only authenticated users can access this route
  authGuard();

  document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (!postId) {
      console.error("Post ID not found in URL");
      window.location.href = "/";
      return;
    }

    try {
      // Load the existing post data and populate the form
      const post = await readPost(postId);
      document.getElementById("title").value = post.title || "";
      document.getElementById("body").value = post.body || "";
      document.getElementById("tags").value = post.tags ? post.tags.join(", ") : "";

      // Attach event listener for the form submission
      const updateForm = document.forms.updatePost;
      if (!updateForm) {
        console.error("Update Post form not found in the DOM");
        return;
      }

      updateForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Collect and format form data for submission
        const formData = new FormData(event.target);
        const updatedData = Object.fromEntries(formData.entries());
        
        try {
          // Send the update request to the server
          await updatePost(postId, updatedData);
          alert("Post updated successfully!");
          window.location.href = `/post/?id=${postId}`; // Redirect to the post view page after successful update
        } catch (error) {
          console.error("Failed to update post:", error);
          alert("An error occurred while updating the post.");
        }
      });
    } catch (error) {
      console.error("Failed to load post data:", error);
      window.location.href = "/";
    }
  });
}
