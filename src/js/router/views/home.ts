import { authGuard } from "@utilities/authGuard";
import { readPostsByUser, readPostsFromFollowing } from "@api/post/read";
import { onLogout } from "@ui/auth/logout";
import { getUser } from "@utilities/getUser";
import { readProfile } from "@/js/api/profile/read";
import { getUserProfile } from "@/js/utilities/getUserProfile";
import { createPostHTML } from "@/components/cards/PostCard";
import { HomeProfile } from "@/components/profile/HomeProfile";

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

  // TODO add pagination
  // TODO add search

  try {
    if (!combinedPosts || combinedPosts.length === 0) {
      const li = document.createElement("li");
      li.innerHTML =
        "Your home timeline is empty! Create a post to get started, or follow some users to see their posts.";
      postsContainer.appendChild(li);
    } else {
      combinedPosts.forEach((post) => {
        console.log("AQUI ", post);
        console.log("AQUI AHORA", post.reactions[0]?.count);
        const isFollowing = getFollowingUsers?.find(
          (user) => user.name === post.author.name
        )
          ? true
          : false;

        const isLiked =
          post.reactions[0]?.count &&
          post.reactions[0].count > 0 &&
          ((post.author.name === getUser() && !post.reactions[0]?.reactors) ||
            post.reactions[0]?.reactors?.find((user) => user === getUser()))
            ? true
            : false;

        const isUserPost = post.author.name === getUser() ? true : false;

        const postHTML = createPostHTML(post, isFollowing, isLiked, isUserPost);
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

export async function renderProfile() {
  const user = getUser();
  const profileContainer = document.querySelector(
    ".profile__container"
  ) as HTMLElement;

  const profileData = await readProfile(user);

  if (profileData) {
    const profile = new HomeProfile();
    profile.data = profileData;
    profileContainer.appendChild(profile);
  }
}

authGuard();
loadHomePage();
