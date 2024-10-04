import { readPost, updatePost } from '../../api/post.js';

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  const form = document.getElementById('editPostForm');

  if (!postId) {
    alert('No post ID specified.');
    return;
  }

  try {
    // Fetch the post data using the API and populate the form fields
    const post = await readPost(postId);
    form.title.value = post.title || 'No Title Available'; // Fallback if title is missing
    form.body.value = post.body || 'No Content Available'; // Fallback if body is missing
    form.tags.value = Array.isArray(post.tags) ? post.tags.join(', ') : ''; // Ensure tags are an array before using join

    // Handle form submission
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const updatedData = Object.fromEntries(formData.entries());

      // Convert the tags string into an array
      updatedData.tags = updatedData.tags.split(',').map(tag => tag.trim());
      console.log('Updated Post Data:', updatedData); // Log the updated data for debugging

      try {
        // Update the post using the modified payload structure
        await updatePost(postId, updatedData);
        window.location.href = `/post/index.html?id=${postId}`;
      } catch (error) {
        console.error('Failed to update post:', error);
        alert('Failed to update post');
      }
    });
  } catch (error) {
    console.error('Failed to load post data:', error);
    alert('Failed to load post');
  }
});
