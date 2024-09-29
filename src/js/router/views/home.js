import { displayPosts } from "../../ui/post/list.js";

export default function homeView() {
  console.log('Home view loaded');

  const isLoggedIn = !!localStorage.getItem('token');

  const main = document.querySelector("main");
  
  // Check if the single-post-container already exists
  let singlePostContainer = main.querySelector('#single-post-container');
  
  // If it doesn't exist, create it
  if (!singlePostContainer) {
    singlePostContainer = document.createElement('div');
    singlePostContainer.id = 'single-post-container';
    singlePostContainer.style.display = 'none';
    singlePostContainer.innerHTML = `
      <div id="post-content"></div>
      <div id="post-reactions"></div>
      <form id="commentForm">
        <textarea name="commentBody" required></textarea>
        <input type="hidden" name="replyToId" value="null">
        <button type="submit">Add Comment</button>
      </form>
      <div id="commentsList"></div>
      <button id="back-to-posts">Back to Posts</button>
    `;
  }

  // Update the main content, preserving the single-post-container
  main.innerHTML = `
    <h1>Home</h1>
    ${isLoggedIn ? '<button id="create-post-button">Create Post</button>' : ''}
    <div id="posts-container"></div>
  `;
  
  // Append the single-post-container back to main
  main.appendChild(singlePostContainer);

  // Set up the Create Post button if the user is logged in
  if (isLoggedIn) {
    const createPostButton = document.getElementById('create-post-button');
    if (createPostButton) {
      createPostButton.addEventListener('click', () => {
        window.location.href = '/post/create/';
      });
      console.log('Create Post button set up');
    } else {
      console.error('Create Post button not found');
    }
  }

  displayPosts();
  // You can add any additional home page logic here
}