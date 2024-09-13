import { deletePost } from "@api/post/delete";
import { renderPosts } from "@/js/router/views/home";

async function onDeletePost(postId: number) {
  const confirmed = confirm("Are you sure you want to delete this post?");
  if (confirmed) {
    try {
      await deletePost(postId);
      renderPosts();
    } catch (error) {
      console.error(error);
    }
  } else {
    return;
  }
}

export function getDeleteButtons() {
  const deletedButtons = document.querySelectorAll(".delete-btn");
  deletedButtons.forEach((button) => {
    const postId = Number(button.getAttribute("data-post-id"));
    button.addEventListener("click", () => onDeletePost(postId));
  });
}
