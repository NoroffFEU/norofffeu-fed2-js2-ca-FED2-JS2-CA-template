import { readPost } from "../../api/post/read";
import { makeAPost } from "../../ui/post/makePost";

const id = JSON.parse(localStorage.getItem("postID"));
const userinfo = JSON.parse(localStorage.getItem("userInfo"));

/**
 * fetches the single post - and creates the html for it.
 *
 * @example
 * ```js
 * showPost()
 * ```
 */
const showPost = async () => {
  const post = await readPost(id);
  makeAPost(post, "postContainer");
  const comments = post.comments;
  const settingsContainer = document.getElementById("postSettingsContainer");
  const commentContainer = document.getElementById("postCommentContainer");
  console.log("post:", post);

  comments.forEach((comment) => {
    const commentDiv = document.createElement("div");
    commentDiv.className = "postContainer postCommentContainer";

    const commentInfoDiv = document.createElement("div");
    commentInfoDiv.className = "flex justify-between";

    const commentAuthor = document.createElement("p");
    commentAuthor.innerText = comment.author.name;

    const commentDate = document.createElement("p");
    commentDate.innerText = comment.created;

    const commentText = document.createElement("p");
    commentText.innerText = comment.body;

    commentInfoDiv.append(commentAuthor, commentDate);
    commentDiv.append(commentInfoDiv, commentText);
    commentContainer.append(commentDiv);
  });
};

showPost();
