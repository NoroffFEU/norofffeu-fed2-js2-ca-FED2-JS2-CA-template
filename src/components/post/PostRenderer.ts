import { getUser } from "@/js/utilities/getUser";
import { getUserProfile } from "@/js/utilities/getUserProfile";
import { PostResponse } from "@/types/types";

export async function renderPosts(
  posts: PostResponse[],
  postsContainer: HTMLElement
) {
  const getFollowingUsers = await getUserProfile();

  if (!posts || posts.length === 0) {
    postsContainer.innerHTML = "No posts found, something went wrong.";
  } else {
    posts.forEach((post) => {
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
    });
  }
}
