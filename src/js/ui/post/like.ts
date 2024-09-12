import { renderPosts } from "@/js/router/views/home";
import { reactToPost } from "@api/post/react";

async function onLikePost(postId: number) {
  try {
    await reactToPost(postId, "👍");
    renderPosts();
  } catch (error) {
    console.error(error);
  }
}

export function getLikeButtons() {
  const likeButtons = document.querySelectorAll(".like-btn");
  likeButtons.forEach((button) => {
    const postId = Number(button.getAttribute("data-post-id"));
    button.addEventListener("click", () => onLikePost(postId));
  });
}
