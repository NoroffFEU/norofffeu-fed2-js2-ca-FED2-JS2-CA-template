import { readPosts } from "../../api/post/read";
import { makeAPost } from "../../ui/post/makePost";
import { authGuard } from "../../utilities/authGuard";
import { makeHeader } from "../../ui/global/header";

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
const runPage = () => {
  const header = document.getElementById("mainHeader");
  authGuard();
  makeHeader(header);
  readHomePagePosts();
};

runPage();
