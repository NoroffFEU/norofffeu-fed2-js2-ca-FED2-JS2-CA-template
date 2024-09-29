import { readPosts } from '../../api/post.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const posts = await readPosts(12, 1);
    const postListElement = document.getElementById('postList');

    if (!postListElement) {
      console.error('postList element not found in the DOM');
      return;
    }

    postListElement.innerHTML = '';
    posts.forEach((post) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<a href="/post/index.html?id=${post.id}">${post.title}</a>`;
      postListElement.appendChild(listItem);
    });
  } catch (error) {
    console.error('Failed to load posts:', error);
    alert('Failed to load posts');
  }
});
