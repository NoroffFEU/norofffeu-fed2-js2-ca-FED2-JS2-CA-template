import { PostResponse } from "@/types/types";
import { authGuard } from "../../utilities/authGuard";
import { readPostsByUser } from "@api/post/read";
import { onLogout } from "@ui/auth/logout";
import { deletePost } from "@api/post/delete";

authGuard();
const posts = document.getElementById("posts") as HTMLUListElement;

const logoutBtn = document.getElementById("logout-btn") as HTMLButtonElement;

async function renderPosts() {
  const postsToRender = await readPostsByUser("Thursdayday");

  posts.innerHTML = "";

  if (!postsToRender || postsToRender.length === 0) {
    const li = document.createElement("li");
    li.innerHTML = "No posts found";
    posts.appendChild(li);
  } else {
    postsToRender.forEach((post) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="/post/${post.id}/">${post.title}</a> <button class="delete-btn" data-post-id="${post.id}">Delete</button> <a href="/post/edit/?id=${post.id}">Edit</a>`;
      posts.appendChild(li);
    });

    const deleteButtons = posts.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
      const postId = Number(button.getAttribute("data-post-id"));
      button.addEventListener("click", () => onDeletePost(postId));
    });
  }
}

renderPosts();

logoutBtn.addEventListener("click", onLogout);

async function onDeletePost(postId: number) {
  try {
    await deletePost(postId);
    renderPosts();
  } catch (error) {
    console.error(error);
  }
}
