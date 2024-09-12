import { authGuard } from "@utilities/authGuard";
import { readPostsByUser } from "@api/post/read";
import { onLogout } from "@ui/auth/logout";
import { getUser } from "@utilities/getUser";
import { getDeleteButtons } from "@ui/post/delete";
import { getLikeButtons } from "@ui/post/like";

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
      li.innerHTML = `
      <li>
        <div>
          <a href="/post/${post.id}/">${post.title}</a>
        </div>
        <div>
          <button class="delete-btn" data-post-id="${post.id}">Delete</button> 
          <a href="/post/edit/?id=${post.id}">Edit</a>
          <button class="like-btn" data-post-id="${post.id}">${post._count.reactions} | 👍</button>
        </div>
        <hr>
      </li> `;
      postsContainer.appendChild(li);
    });

    getLikeButtons();
    getDeleteButtons();
  }
}

authGuard();
loadHomePage();
