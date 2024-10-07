import { deletePost } from "../../api/post/delete";
import { load } from "../../api/auth/key";

export async function onDeletePost(post, author) {
    const user = load("user");
    const userName = user.name;
  
    const deleteButton = document.getElementById("delete-button-container");
  
    if (author === userName) {
      deleteButton.innerText = "Delete Post";
      deleteButton.setAttribute("id", post.id);
      deleteButton.style.display = "block";
  
      deleteButton.addEventListener("click", async () => {
        const postId = deleteButton.getAttribute("id");
        try {
          await deletePost(postId);
          alert("The post was deleted");
          window.location.href = "/";
        } catch (error) {
          console.error("The post could not be deleted:", error);
          alert("Failed to delete the post.");
        }
      });
    } else {
      deleteButton.style.display = "none";
    }
  }