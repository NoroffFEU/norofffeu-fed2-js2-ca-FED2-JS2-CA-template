import { onLogout } from "../../ui/auth/logout";
import { generatePostHTML } from "../../ui/post/displayPosts";
import api from "../../api/instance.js";

const logoutButton = document.querySelector(".logout-button");
logoutButton.addEventListener("click", onLogout);

export async function displayAllPosts() {
  try {
    const posts = await api.posts.getPosts();
    const PostData = posts.data;
    const postFeed = document.querySelector('.feed');
    postFeed.innerHTML = '';
    PostData.forEach(post => {
      const postHTML = generatePostHTML(post);
      postFeed.appendChild(postHTML);
    })
  } catch(error) {
    alert(error.message)
  }
}

displayAllPosts();