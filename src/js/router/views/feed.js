import { onLogout } from "../../ui/auth/logout";
import { generatePostHTML } from "../../ui/post/displayPosts";
import api from "../../api/instance.js";

const logoutButton = document.querySelector(".logout-button");
logoutButton.addEventListener("click", onLogout);

export async function displayAllPosts() {
  try {
    const posts = await api.posts.getPosts();
    const postData = posts.data;
    console.log(postData); //delete later
    console.log(postData[0].comments.length);
    const postFeed = document.querySelector('.feed');
    postFeed.innerHTML = '';
    postData.forEach(post => {
      const postHTML = generatePostHTML(post);
      postFeed.appendChild(postHTML);
    })
  } catch(error) {
    alert(error.message)
  }
}

displayAllPosts();