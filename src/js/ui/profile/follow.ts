import { toggleFollowUser } from "@/js/api/profile/follow";
import { readProfile } from "@/js/api/profile/read";
import { renderAllPosts } from "@/js/router/views/explore";
import { getUser } from "@/js/utilities/getUser";

function handleFollow() {
  try {
    const followButtons = document.querySelectorAll(".follow-btn");
    console.log(followButtons);
    console.log("hello");
  } catch (error) {
    console.error(error);
  }
}

export function getFollowButtons() {
  const followButtons = document.querySelectorAll(".follow-btn");

  followButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const userToFollow = button.getAttribute("data-user-name");
      const isFollowing = button.getAttribute("data-is-following");
      if (isFollowing === "true") {
        const userPosts = document.querySelectorAll(
          `[data-user-name="${userToFollow}"]`
        );
        toggleFollowUser(userToFollow, "unfollow");
        userPosts.forEach((userPost) => {
          userPost.setAttribute("data-is-following", "false");
          userPost.innerHTML = "Follow";
          console.log(userPost);
        });
      } else if (isFollowing === "false") {
        const userPosts = document.querySelectorAll(
          `[data-user-name="${userToFollow}"]`
        );
        toggleFollowUser(userToFollow, "follow");
        userPosts.forEach((userPost) => {
          userPost.setAttribute("data-is-following", "true");
          console.log(userPost);
          userPost.innerHTML = "Unfollow";
        });
      }
    });
  });
}
