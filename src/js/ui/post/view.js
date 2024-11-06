
import { readPosts } from '../../api/post.js';
import { displayError } from '../../utilities/errorHandler.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch the posts
    const posts = await readPosts();

    // Get the postList element where cards will be rendered
    const postList = document.getElementById('postList');
    postList.innerHTML = ''; // Clear any existing content

    // Loop through each post and create a card
    posts.forEach(post => {
      const postCard = document.createElement('div');
      postCard.className = 'col-md-4 mb-4'; // Bootstrap grid class for responsive layout

      // Card HTML structure
      postCard.innerHTML = `
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${post.title || 'Untitled'}</h5>
            <p class="card-text">${post.body ? post.body.slice(0, 100) + '...' : 'No Content Available'}</p>
            <a href="/post/index.html?id=${post.id}" class="btn btn-primary">Read More</a>
          </div>
        </div>
      `;

      // Append the card to the postList
      postList.appendChild(postCard);
    });

  } catch (error) {
    displayError(error.message || 'Failed to load posts.');
  }
});
