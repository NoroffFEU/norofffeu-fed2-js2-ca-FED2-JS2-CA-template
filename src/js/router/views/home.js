import { authGuard } from "../../utilities/authGuard.js";
import { displayPosts } from "../../ui/post/list.js";

export default function homeView() {
  console.log('Home view loaded');
  
  // Run the authentication guard
  authGuard();

  // Update the main content
  const main = document.querySelector("main");
  main.innerHTML = `
    <h1>Home</h1>
    <div id="posts-container"></div>
  `;
  
  // Display the posts
  displayPosts();

  // You can add any additional home page logic here
}