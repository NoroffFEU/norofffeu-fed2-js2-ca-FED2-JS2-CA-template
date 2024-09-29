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
    const post = await readPost(postId);
    form.title.value = post.title;
    form.body.value = post.body;
    form.tags.value = post.tags.join(', ');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const updatedData = Object.fromEntries(formData.entries());
      try {
        await updatePost(postId, updatedData);
        window.location.href = `/post/index.html?id=${postId}`;
      } catch (error) {
        console.error(error);
        alert('Failed to update post');
      }
    });
  } catch (error) {
    console.error('Failed to load post data:', error);
    alert('Failed to load post');
  }
});
