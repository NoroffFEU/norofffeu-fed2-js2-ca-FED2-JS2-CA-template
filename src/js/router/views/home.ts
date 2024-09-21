import { authGuard } from "@utilities/authGuard";
import { readPostsByUser, readPostsFromFollowing } from "@api/post/read";
import { onLogout } from "@ui/auth/logout";
import { getUser } from "@utilities/getUser";
import { getUserProfile } from "@/js/utilities/getUserProfile";
import { createPostHTML } from "@/components/cards/PostCard";
import { renderProfile } from "@/js/ui/profile/renderUserProfile";
import { creatorLiked } from "@/js/utilities/checkIfCreatorLiked";

async function loadHomePage() {
  try {
    document.getElementById("logout-btn")?.addEventListener("click", onLogout);
    renderPosts();
    renderProfile();
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

  combinedPosts.sort((a, b) => {
    return new Date(b.created).getTime() - new Date(a.created).getTime();
  });

  const getFollowingUsers = await getUserProfile();

  console.log("COMBINED", postsByUser);

  // TODO add search

  try {
    if (!combinedPosts || combinedPosts.length === 0) {
      const li = document.createElement("li");
      li.innerHTML =
        "Your home timeline is empty! Create a post to get started, or follow some users to see their posts.";
      postsContainer.appendChild(li);
    } else {
      combinedPosts.forEach(async (post) => {
        const isFollowing = getFollowingUsers?.find(
          (user) => user.name === post.author.name
        )
          ? true
          : false;

        const isUserPost = post.author.name === getUser() ? true : false;

        const test = isUserPost ? await creatorLiked(post.id) : false;
        console.log(post.id, test);

        const isLiked = post.reactions[0]?.reactors?.find(
          (user) => user === getUser()
        )
          ? true
          : false;

        const postHTML = createPostHTML(
          post,
          isFollowing,
          isLiked || test,
          isUserPost,
          false
        );
        postsContainer.insertAdjacentHTML("beforeend", postHTML);
      });
    }
  } catch (error) {
    console.error(error);
    const li = document.createElement("li");
    li.innerHTML =
      "Your home timeline is empty! Create a post to get started, or follow some users to see their posts.";
    postsContainer.appendChild(li);
  }
}

authGuard();
loadHomePage();
