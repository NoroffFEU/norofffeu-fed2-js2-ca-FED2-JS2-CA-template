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
    // Fetch the post data using the API
    const response = await readPost(id);
    console.log('Post Data:', response); // Log the entire response to verify structure

    // Extract post data from the response
    const post = response.data;

    // Check if post data is available
    if (!post) {
      displayError('No post data found.');
      return;
    }

    // Populate existing HTML elements with post data
    document.getElementById('title').textContent = post.title || 'No Title Available';
    document.getElementById('body').textContent = post.body || 'No Content Available';

    // Check if post.tags is defined and is an array
    const tagsElement = document.getElementById('tags');
    if (Array.isArray(post.tags) && post.tags.length > 0) {
      tagsElement.textContent = `Tags: ${post.tags.join(', ')}`;
    } else {
      tagsElement.textContent = 'No tags';
    }

    // Set the edit link URL to include the post ID
    const editLink = document.getElementById('editLink');
    editLink.href = `/post/edit/index.html?id=${id}`;

  } catch (error) {
    displayError(error.message || 'Failed to load post.');
  }
});
