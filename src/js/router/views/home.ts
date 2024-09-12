import { authGuard } from "../../utilities/authGuard";
import { readPostsByUser } from "@api/post/read";
import { onLogout } from "@ui/auth/logout";
import { getUser } from "@/js/utilities/getUser";
import { getDeleteButtons } from "@/js/ui/post/delete";

async function loadHomePage() {
  try {
    document.getElementById("logout-btn")?.addEventListener("click", onLogout);
    renderPosts();
  } catch (error) {
    console.error(error);
  }
}

export async function renderPosts() {
  const user = getUser();
  const postsContainer = document.getElementById("posts") as HTMLUListElement;
  const postsToRender = await readPostsByUser(user);

  postsContainer.innerHTML = "";

  if (!postsToRender || postsToRender.length === 0) {
    const li = document.createElement("li");
    li.innerHTML =
      "Your home timeline is empty! Create a post to get started, or follow some users to see their posts.";
    postsContainer.appendChild(li);
  } else {
    postsToRender.forEach((post) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="/post/${post.id}/">${post.title}</a> <button class="delete-btn" data-post-id="${post.id}">Delete</button> <a href="/post/edit/?id=${post.id}">Edit</a>`;
      postsContainer.appendChild(li);
    });

    getDeleteButtons();
  }
}

authGuard();
loadHomePage();
