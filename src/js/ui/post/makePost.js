import { onDeletePost } from "./delete";

export const makePost = (userPosts, id) => {
  const outerContainer = document.getElementById(id);
  const userinfo = JSON.parse(localStorage.getItem("userInfo"));
  const username = userinfo.name;

  userPosts.forEach((post) => {
    console.log("username: ", username);
    console.log("post Username: ", post);

    const container = document.createElement("div");
    container.className = "postContainer";
    const countDiv = document.createElement("div");
    countDiv.className = "flex gap-10 justify-between items-center";

    const title = document.createElement("h2");
    title.innerText = post.title;
    title.className = "text-center";

    const text = document.createElement("p");
    text.innerText = post.body;
    const imageDiv = document.createElement("div");
    imageDiv.className = "overflow-hidden postImageContainer";
    if (post.media) {
      const image = document.createElement("img");
      image.src = post.media.url;
      image.alt = post.media.alt;
      image.className = "postImage";

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

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", onDeletePost);

    const reactionSection = document.createElement("div");
    reactionSection.className = "flex gap-10";

    const commentsDiv = document.createElement("div");
    commentsDiv.innerHTML = `
        <p>Comments: ${post._count.comments}</p>`;

    const reactionDiv = document.createElement("div");
    reactionDiv.innerHTML = `
        <p>Reactions: ${post._count.reactions}</p>`;

    const seePost = document.createElement("button");
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
  });
};
