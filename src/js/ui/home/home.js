import { readPosts } from '../../api/post.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const posts = await readPosts(12, 1);

    // Log the response to see its structure
    console.log('Posts Response:', posts);

    const postListElement = document.getElementById('postList');

    if (!postListElement) {
      console.error('postList element not found in the DOM');
      return;
    }

    postListElement.innerHTML = '';

    // Check if `posts` is an array and iterate accordingly
    if (Array.isArray(posts)) {
      posts.forEach((post) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="/posts/index.html?id=${post.id}">${post.title}</a>`;
        postListElement.appendChild(listItem);
      });
    } else if (posts.data && Array.isArray(posts.data)) {
      // Handle cases where posts might be wrapped in a `data` property
      posts.data.forEach((post) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="/posts/index.html?id=${post.id}">${post.title}</a>`;
        postListElement.appendChild(listItem);
      });
    } else {
      console.error('Unexpected posts data format:', posts);
      alert('Unexpected posts data format received. Please check the console for details.');
    }
  } catch (error) {
    console.error('Failed to load posts:', error);
    alert('Failed to load posts');
  }
});
