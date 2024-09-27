import { readPost } from "../../api/post/read";
import { onDeletePost } from "../../ui/post/delete";

const id = JSON.parse(localStorage.getItem("postID"));
const userinfo = JSON.parse(localStorage.getItem("userInfo"));
const username = userinfo.name;

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
  const tags = post.tags;
  const comments = post.comments;
  const titleContainer = document.getElementById("postTitleContainer");
  const textContainer = document.getElementById("postTextContainer");
  const ImageContainer = document.getElementById("postImageContainer");
  const tagsContainer = document.getElementById("postTagsContainer");
  const reactionContainer = document.getElementById("postReactionContainer");
  const settingsContainer = document.getElementById("postSettingsContainer");
  const commentContainer = document.getElementById("postCommentContainer");
  console.log("post:", post);

  const title = document.createElement("h2");
  title.innerText = post.title;
  title.className = "text-center";

  const text = document.createElement("p");
  text.innerText = post.body;

  const image = document.createElement("img");
  image.className = "postImage";
  image.src = post.media.url;
  image.alt = post.media.alt;

  tags.forEach((tag) => {
    const tagText = document.createElement("p");
    tagText.innerText = tag;
    tagsContainer.append(tagText);
  });

  const commentsDiv = document.createElement("div");
  commentsDiv.innerHTML = `
  <p> Comments ${post._count.comments}</p>`;

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.id = post.id;
  console.log("blob", post.id);

  deleteButton.addEventListener("click", onDeletePost);

  const reactionDiv = document.createElement("div");
  reactionDiv.innerHTML = `
  <p> Reactions ${post._count.reactions}`;

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

  titleContainer.appendChild(title);
  textContainer.appendChild(text);
  ImageContainer.appendChild(image);
  reactionContainer.append(commentsDiv, reactionDiv);
  if (username === post.author.name) {
    settingsContainer.append(editButton, deleteButton);
  }
};

showPost();
