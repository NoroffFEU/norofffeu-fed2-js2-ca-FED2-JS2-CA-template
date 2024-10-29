import { onDeletePost } from "./delete";
/**
 * Makes the HTML for a post
 * @param {object} post - post object
 * @param {string} id - ID of the container you want the post / posts to be in.
 */
export const makeAPost = (post, id) => {
  const outerContainer = document.getElementById(id);

  outerContainer.className = "flex flex-col items-center mt-20";

  const userinfo = JSON.parse(localStorage.getItem("userInfo"));
  const username = userinfo.name;

  const container = document.createElement("div");
  container.className =
    "flex flex-col gap-3 max-w-[750px] w-full rounded-md bg-lightGray mb-10 shadow-blue shadow-lg p-5 ";
  const countDiv = document.createElement("div");
  countDiv.className = "flex gap-10 justify-between items-center";

  const title = document.createElement("h2");
  title.innerText = post.title;
  title.className = "text-center text-blue text-2xl font-semibold";

  const text = document.createElement("p");
  text.innerText = post.body;
  text.className = "text-blue font-semibold";
  const imageDiv = document.createElement("div");
  imageDiv.className =
    "max-h-[200px] overflow-hidden w-auto flex items-center justify-center";
  if (post.media) {
    const image = document.createElement("img");
    image.src = post.media.url;
    image.alt = post.media.alt;
    image.className = "max-h-[200px]";

    imageDiv.appendChild(image);
  } else {
    const image = document.createElement("p");
    image.innerText = "*Image Not Found*";

    imageDiv.appendChild(image);
  }

  const editSection = document.createElement("div");
  editSection.className = "flex gap-10";

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.addEventListener("click", () => {
    window.location.href = "/post/edit/";
    localStorage.setItem("postID", JSON.stringify(post.id));
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.id = post.id;
  deleteButton.addEventListener("click", onDeletePost);

  const reactionSection = document.createElement("div");
  reactionSection.className = "flex gap-10";

  const commentsDiv = document.createElement("div");
  commentsDiv.innerHTML = `
        <p><i class="fa-solid fa-comment fa-xl"  style="color: #146EAE"></i> ${post._count.comments}</p>`;

  const reactionDiv = document.createElement("div");
  reactionDiv.innerHTML = `
        <p><i class="fa-solid fa-heart fa-xl" style="color: #c50d0d;"></i> ${post._count.reactions}</p>`;

  const seePost = document.createElement("button");
  seePost.className = "text-blue text-l font-semibold text-center w-full";
  seePost.innerText = "See Post";

  seePost.addEventListener("click", () => {
    window.location.href = "/post/";
    localStorage.setItem("postID", JSON.stringify(post.id));
  });

  countDiv.append(reactionSection, editSection);
  reactionSection.append(commentsDiv, reactionDiv);
  container.append(title, text, imageDiv, seePost, countDiv);
  outerContainer.append(container);
  if (username === post.author.name) {
    editSection.append(editButton, deleteButton);
  }
};
