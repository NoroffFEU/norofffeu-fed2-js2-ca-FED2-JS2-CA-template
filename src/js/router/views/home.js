import { displayPosts } from "../../ui/post/list.js";

/**
 * Sets up and renders the home view of the application.
 * 
 * This function performs the following tasks:
 * 1. Checks if the user is logged in.
 * 2. Creates or updates the main content of the home page.
 * 3. Sets up a container for displaying single posts.
 * 4. Adds a "Create Post" button if the user is logged in.
 * 5. Calls the displayPosts function to show the list of posts.
 * 
 * @function homeView
 * @returns {void}
 * 
 * @example
 * // Call this function when the home page loads
 * homeView();
 */

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
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-3xl font-bold text-blue-400 ml-[20%]">Home</h1>
    ${isLoggedIn ? 
      `<button id="create-post-button" class="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-md transition-colors">Create Post</button>`
      : ''
    }
  </div>
  <div id="posts-container" class="clear-both"></div>
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