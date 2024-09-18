import { authGuard } from "@utilities/authGuard";
import { readPostsByUser, readPostsFromFollowing } from "@api/post/read";
import { onLogout } from "@ui/auth/logout";
import { getUser } from "@utilities/getUser";
import { getDeleteButtons } from "@ui/post/delete";
import { getLikeButtons } from "@ui/post/like";
import { toggleFollowUser } from "@/js/api/profile/follow";
import { readProfile } from "@/js/api/profile/read";
import { PostResponse } from "@/types/types";
import { getUserProfile } from "@/js/utilities/getUserProfile";
import { createPostHTML } from "@/components/cards/PostCard";

async function loadHomePage() {
  try {
    document.getElementById("logout-btn")?.addEventListener("click", onLogout);
    renderPosts();
  } catch (error) {
    console.error(error);
  }
}

export async function renderPosts() {
  const postsContainer = document.getElementById("posts") as HTMLUListElement;
  const user = getUser();
  const postsByUser = (await readPostsByUser(user)) || [];
  const postsFromFollowing = (await readPostsFromFollowing()) || [];

  const combinedPosts = [...postsByUser, ...postsFromFollowing];

  const getFollowingUsers = await getUserProfile();

  console.log(combinedPosts);

  // TODO add pagination
  // TODO add search

  if (!combinedPosts || combinedPosts.length === 0) {
    const li = document.createElement("li");
    li.innerHTML =
      "Your home timeline is empty! Create a post to get started, or follow some users to see their posts.";
    postsContainer.appendChild(li);
  } else {
    combinedPosts.forEach((post) => {
      const isFollowing = getFollowingUsers?.find(
        (user) => user.name === post.author.name
      )
        ? true
        : false;

      const isLiked = post.reactions[0]?.reactors.find(
        (user) => user === getUser()
      )
        ? true
        : false;

      const isUserPost = post.author.name === getUser() ? true : false;

      const postHTML = createPostHTML(post, isFollowing, isLiked, isUserPost);
      postsContainer.insertAdjacentHTML("beforeend", postHTML);
    });

    getLikeButtons();
    getDeleteButtons();
  }
}

authGuard();
loadHomePage();
