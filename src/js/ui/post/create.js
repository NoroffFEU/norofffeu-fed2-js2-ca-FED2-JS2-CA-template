import { createPost } from '../../api/post.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('createPostForm');
  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const postData = Object.fromEntries(data.entries());

      try {
        const post = await createPost(postData);
        window.location.href = `/post/index.html?id=${post.id}`;
      } catch (error) {
        console.error(error);
        alert('Failed to create post');
      }
    });
  }
});
