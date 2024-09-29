// src/js/ui/post/list.js

import { readPosts } from '../../api/post.js';
import { displayError } from '../../utilities/errorHandler.js';

export async function listPosts(limit = 12, page = 1) {
  try {
    const posts = await readPosts(limit, page);
    const postListElement = document.getElementById('postList');

    posts.forEach((post) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<a href="/post/index.html/?id=${post.id}">${post.title}</a>`;
      postListElement.appendChild(listItem);
    });
  } catch (error) {
    displayError(error.message || 'Failed to load posts.');
  }
}

// src/js/ui/post/list.js
document.addEventListener('DOMContentLoaded', () => {
  const postListElement = document.getElementById('postList');
  if (!postListElement) {
    console.error("postList element not found in the DOM");
    return;
  }

  // Load posts if postListElement is found
  listPosts();
});

