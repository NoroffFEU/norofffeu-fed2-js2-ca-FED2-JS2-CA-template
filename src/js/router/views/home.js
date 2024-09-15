import { readPosts } from "../../api/post/read";
import { setLogoutListener } from "../../ui/global/logout";
import { makePost } from "../../ui/post/makePost";
import { authGuard } from "../../utilities/authGuard";

authGuard();
setLogoutListener();

const readHomePagePosts = async () => {
  const posts = await readPosts();

  makePost(posts, "allPosts");
};

readHomePagePosts();
