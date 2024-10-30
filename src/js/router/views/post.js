import { readPost } from "../../api/post/read";
import { makeHeader } from "../../ui/global/header";
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
const header = document.querySelector("header");
makeHeader(header);

const showPost = async () => {
  const post = await readPost(id);
  const comments = post.comments;
  const commentContainer = document.getElementById("postCommentContainer");

  const outerContainer = document.getElementById("postContainer");
  outerContainer.className = "flex flex-col items-center mt-20 w-full";

  const username = post.author.name;

  const container = document.createElement("div");
  container.className =
    "flex flex-col gap-3 max-w-[750px] w-full rounded-md bg-lightGray mb-10 shadow-blue shadow-lg p-5 ";
  const countDiv = document.createElement("div");
  countDiv.className = "flex gap-10 justify-between items-center";

  const title = document.createElement("h2");
  title.innerText = post.title;
  title.className = "text-center text-blue text-2xl font-semibold";

  const author = document.createElement("p");
  author.innerHTML = `<p>Author: ${username}`;
  author.className = "text-blue text-lg font-bold";

  const text = document.createElement("p");
  text.innerText = post.body;
  text.className = "text-blue text-xl font-semibold";

  const imageDiv = document.createElement("div");
  imageDiv.className =
    "max-h-[500px] overflow-hidden w-auto flex items-center justify-center";
  if (post.media) {
    const image = document.createElement("img");
    image.src = post.media.url;
    image.alt = post.media.alt;
    image.className = "max-h-[500px]";

    imageDiv.appendChild(image);
  } else {
    const image = document.createElement("p");
    image.innerText = "*Image Not Found*";

    imageDiv.appendChild(image);
  }

  const reactionSection = document.createElement("div");
  reactionSection.className = "flex gap-10";

  const commentsDiv = document.createElement("div");
  commentsDiv.innerHTML = `
        <p><i class="fa-solid fa-comment fa-xl"  style="color: #146EAE"></i> ${post._count.comments}</p>`;

  const reactionDiv = document.createElement("div");
  reactionDiv.innerHTML = `
        <p><i class="fa-solid fa-heart fa-xl" style="color: #c50d0d;"></i> ${post._count.reactions}</p>`;

  const tagsContainer = document.createElement("div");
  tagsContainer.className = "flex gap-2 items-center";

  const tagsDiv = document.createElement("div");
  tagsDiv.className = "flex gap-4";

  const tagText = document.createElement("p");
  tagText.className = "text-blue text-lg font-bold";
  tagText.innerText = "Tags:";
  post.tags.forEach((tagText) => {
    const tag = document.createElement("p");
    tag.innerText = tagText;
    tag.className = "text-blue text-lg font-bold";

    tagsDiv.append(tag);
  });

  countDiv.append(reactionSection);
  reactionSection.append(commentsDiv, reactionDiv);
  container.append(title, text, imageDiv, author, tagsContainer, countDiv);
  tagsContainer.append(tagText, tagsDiv);
  outerContainer.append(container);

  comments.forEach((comment) => {
    const commentDiv = document.createElement("div");
    commentDiv.className = "bg-lightGray w-full p-5 rounded-md max-w-[750px] w";

    const commentInfoDiv = document.createElement("div");
    commentInfoDiv.className = "flex justify-between";

    const commentAuthor = document.createElement("p");
    commentAuthor.innerText = comment.author.name;
    commentAuthor.className = "text-blue text-xl";

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
