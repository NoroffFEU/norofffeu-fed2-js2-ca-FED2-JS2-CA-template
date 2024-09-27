import { authGuard } from "../../utilities/authGuard";
import { readPosts, readPost, readPostsByUser} from '../../api/post/read.js'; // Ensure the correct import path
import { setLogoutListener } from "../../ui/global/logout.js";
setLogoutListener()


authGuard();

async function populatePosts() {
  const mainContent = document.querySelector('.main-content'); // Find the main content section
  mainContent.innerHTML = ""; // Clear any existing content

  try {
    const posts = await readPosts(12, 1); // Fetch the first 12 posts

    console.log(posts); // Add this line to log the posts to the console

    if (posts.length === 0) {
      mainContent.innerHTML = "<p>No posts available at the moment.</p>";
    }

    posts.forEach(post => {
      const postCard = document.createElement('div');
      postCard.classList.add('post-card');

      // Create the HTML structure for each post dynamically
      postCard.innerHTML = `
      <a href="posts/page.html">
        <div class="post-header">
          <img src="${post.author?.avatar?.url || './public/images/default-avatar.png'}" alt="${post.author?.name || 'Unknown User'}">
          <div class="username">${post.author?.name || 'Unknown User'}</div>
        </div>
      </a>
      <h2>${post.title || 'Untitled Post'}</h2>
      <div class="post-content">${post.body || 'No content available.'}</div>
      <div class="post-image">
        <img src="${post.media?.url || './public/images/default-image.jpg'}" alt="Post Image">
      </div>
      <div class="post-actions">
        <button class="like-button">👍 Like</button>
        <button class="like-button">Edit</button>
        <button class="like-button">Delete</button>
      </div>
      <div class="comment-section">
        <input type="text" class="comment-input" placeholder="Add a comment...">
        <button class="comment-button">Comment</button>
        <div class="comments-list"></div>
      </div>
    `;
    

      // Append the dynamically created post card to the main content
      mainContent.appendChild(postCard);
    });
  } catch (error) {
    console.error("Error populating posts:", error);
    mainContent.innerHTML = "<p>Failed to load posts. Please try again later.</p>";
  }
}

// Call the function to populate posts when the page loads
document.addEventListener("click", () => {
    console.log("DOM fully loaded and parsed. Populating posts...");
    populatePosts();
  });
  