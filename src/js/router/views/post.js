import { onLogout } from "../../ui/auth/logout";
import api from "../../api/instance.js";
import { generateSinglePostHTML } from "../../ui/post/displaySinglePost.js";

const logoutButton = document.querySelector(".logout-button");
logoutButton.addEventListener("click", onLogout);

export async function displaySinglePost() {
  try {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    const post = await api.post.readPost(postId);
    const postData = post.data;

    const singlePostFeed = document.querySelector('.single-post');
    singlePostFeed.innerHTML = "";
    const singlePostHTML = generateSinglePostHTML(postData);
    singlePostFeed.appendChild(singlePostHTML);
  } catch(error) {
    alert(error.message)
  }
}

displaySinglePost();