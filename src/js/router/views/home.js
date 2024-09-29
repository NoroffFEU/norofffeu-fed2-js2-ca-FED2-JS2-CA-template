import { readPosts } from "../../api/post/read";
import { setLogoutListener } from "../../ui/global/logout";
import { makeAPost } from "../../ui/post/makePost";
import { authGuard } from "../../utilities/authGuard";

authGuard();
setLogoutListener();

/**
 * fetches the posts form the front page and creates the HTML for it.
 * @example
 * ```js
 * readHomePagePosts()
 * ```
 */
const readHomePagePosts = async () => {
  const posts = await readPosts();

  posts.forEach((post) => {
    makeAPost(post, "allPosts");
  });
};

readHomePagePosts();
