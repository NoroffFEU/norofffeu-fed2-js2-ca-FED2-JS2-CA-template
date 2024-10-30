import { makeHeader } from "../../ui/global/header";
import { onUpdatePost } from "../../ui/post/update";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const form = document.forms.editPost;

form.addEventListener("submit", onUpdatePost);
const header = document.querySelector("header");
makeHeader(header);

export const makeEditForm = () => {
  const post = JSON.parse(localStorage.getItem("post"));
  const form = document.getElementById("editPost");

  form.innerHTML = `
<input class="formInputOne" type="text" name="title" placeholder="Title" value="${post.title}" maxlength="40" />
<textarea class="formInputTwo" type="text" name="text" placeholder="Add text here.."  maxlength="400"> ${post.body}</textarea>
<input class="formInputOne" type="url" name="url" placeholder="Insert image url here.." value="${post.media.url}" maxlength="300" />
<input class="formInputOne" type="text" name="alt" placeholder="insert an image description here..." value="${post.media.alt}" maxlength="100"/>
<input class="formInputOne" type="text" name="tags" placeholder="Title" value="${post.tags}" />
<button class="text-3xl text-blue buttonEffect font-bold"> Save </button>
`;
};

makeEditForm();
