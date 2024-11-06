// src/js/ui/home/home.js

import { readPosts } from '../../api/post.js'; // Assuming readPosts fetches post data

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const posts = await readPosts(1, 5); // Fetch first 5 recent posts
    const postList = document.getElementById('postList');
    postList.innerHTML = ''; // Clear any existing content

    posts.forEach(post => {
      const postCard = document.createElement('div');
      postCard.className = 'col-md-6 mb-4'; // Bootstrap classes for responsive layout

      // Card HTML structure
      postCard.innerHTML = `
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${post.title || 'Untitled'}</h5>
            <p class="card-text">${post.body ? post.body.slice(0, 100) + '...' : 'No Content Available'}</p>
            <a href="/post/view/index.html?id=${post.id}" class="btn btn-primary">Read More</a>
          </div>
        </div>
      `;
      
      postList.appendChild(postCard);
    });
  } catch (error) {
    console.error('Failed to load recent posts:', error);
  }
});
