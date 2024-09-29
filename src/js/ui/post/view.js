// src/js/ui/post/view.js

import { readPost } from '../../api/post.js';
import { displayError } from '../../utilities/errorHandler.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Get the post ID from the URL 
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (!id) {
    displayError('No post ID specified.');
    return;
  }

  try {
    // Fetch the post data using the API and populate the DOM with it
    const post = await readPost(id);
    document.getElementById('title').textContent = post.title;
    document.getElementById('body').textContent = post.body;
    document.getElementById('tags').textContent = post.tags.join(', ');
    document.getElementById('id').value = id; // Set hidden input field value
  } catch (error) {
    displayError(error.message || 'Failed to load post.');
  }
  // Add event listener to the "Edit Button" button
  const editButton = document.getElementById('updatePost');
  if (editButton) {
    editButton.addEventListener('click', (event) => {
      // Redirect to the edit page with the post ID in the URL
      window.location.href = `/post/edit/index.html?id=${id}`
    });
  }
});
