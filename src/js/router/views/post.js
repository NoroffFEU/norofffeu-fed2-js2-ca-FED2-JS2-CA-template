import { readPost } from "../../api/post/read";
import { readProfile } from "../../api/profile/read.js";
import { commentOnPost } from "../../api/post/update.js";

const profile = await readProfile();
// id params
const urlParams = new URLSearchParams(window.location.search);

// Extract the value of the 'id' parameter
const id = urlParams.get("id");

console.log(id); // Outputs '12' if the URL is something like ?id=12
const post = (await readPost(id)).data;
console.log(post);

const burner = document.getElementById("authorBurner");
const title = document.querySelector("#title");
const content = document.querySelector("#content");
const username = document.querySelector("#username");
const postimage = document.querySelector("#postimage");
const deletebtn = document.getElementById("delete");
const edit = document.getElementById("edit");

title.textContent = post.title;
content.textContent = post.body;
burner.src = post.author.banner.url;
username.textContent = post.author.name;
postimage.src = post.media?.url;

if (post.author?.name !== profile.data.name) {
  deletebtn.remove();
  edit.remove();
}

const comment = document.getElementById("commentList");

let commentListHtml = "";

if (post.comments) {
  post.comments.forEach((comment) => {
    const date = new Date(comment.created).toLocaleDateString();
    const html = `<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 18px; color: #262626; display: flex; align-items: flex-start; padding: 10px 0;">
    <img src="${comment.author.banner.url}" alt="${comment.author.name}" style="width: 32px; height: 32px; border-radius: 50%; margin-right: 10px; object-fit: cover;">
    <div>
      <span style="font-weight: bold; margin-right: 5px;">${comment.author.name}</span>
      <span>${comment.body}</span>
      <div style="font-size: 12px; color: #8e8e8e; margin-top: 5px;">${date}</div>
    </div>
  </div>`;

    commentListHtml += html;
  });
}

console.log(commentListHtml);

comment.insertAdjacentHTML("afterbegin", commentListHtml);

const addCommentBtn = document.querySelector("#add-comment");
const commentBody = document.querySelector("#comment-body");

addCommentBtn.addEventListener("click", async function (e) {
  e.preventDefault();

  const comment = commentBody.value;

  try {
    const res = await commentOnPost(id, { body: comment });
    location.reload();
  } catch (error) {
    console.log(error);
  }
});
