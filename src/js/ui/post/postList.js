import { postList } from "../../api/post/postList";
import { showMessage } from "../global/showMessage";

export async function onPostList() {
  const postsContainer = document.getElementById("postsContainer");
  const postsMessage = document.getElementById("postsMessage");

  if (!postsMessage || !postsContainer) return;

  // Hide the message initially
  postsMessage.style.display = "none";

  try {
    // Fetch posts data
    const response = await postList();
    postsContainer.innerHTML = ""; // Clear previous posts

    // Show message if no posts are available
    if (response.data.length === 0) {
      showMessage(postsMessage, "No posts available at the moment.", "info");
      return;
    }

    // Render each post
    response.data.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            ${
              post.media
                ? `<img src="${post.media.url}" alt="${post.media.alt}" />`
                : ""
            }
            <strong>Tags: ${post.tags.join(", ")}</strong>
            <p><strong>Created:</strong> ${new Date(post.created).toLocaleString()}</p>
            <p><strong>Updated:</strong> ${new Date(post.updated).toLocaleString()}</p>
            <button class="edit-button" data-id="${post.id}">Edit</button>
            <button class="delete-button" data-id="${post.id}">Delete</button>
          `;

      // Add event listener for the edit button
      const editButton = postElement.querySelector(".edit-button");
      editButton.addEventListener("click", async () => {
        window.location.href = `../edit/?postId=${post.id}`;
      });

      // Add event listener for the delete button
      const deleteButton = postElement.querySelector(".delete-button");
      deleteButton.addEventListener("click", async () => {
        const confirmDelete = confirm(
          "Are you sure you want to delete this post?"
        );
        if (!confirmDelete) return; // If user cancels, exit the function

        try {
          await deletePost(post.id); // Call delete function
          showMessage(postsMessage, "Post deleted successfully!", "success");
          postElement.remove(); // Remove post from the DOM
        } catch (error) {
          showMessage(
            postsMessage,
            `Failed to delete post! ${error.message || "Please try again."}`,
            "error"
          );
          console.error("Error:", error.message);
        }
      });

      postsContainer.appendChild(postElement);
    });

    // Show a success message when posts are loaded
    showMessage(postsMessage, "Posts loaded successfully!", "success");
  } catch (error) {
    showMessage(
      postsMessage,
      "Failed to fetch posts! Please try again.",
      "error"
    );
    console.error("Error:", error.message);
  }
}
