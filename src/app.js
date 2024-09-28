import router from "./js/router/index.js";
import { onLogout } from "./js/ui/auth/logout.js";
import { setupCreatePostFunctionality, showCreatePostForm, hideCreatePostForm } from "./js/ui/post/create.js";
import { setupHomePage, displaySinglePost } from "./js/ui/post/list.js";

function updateNavigation() {
  const token = localStorage.getItem('token');
  const createPostLink = document.getElementById('createPostLink');
  const logoutBtn = document.getElementById('logout-btn');
  
  if (token) {
    if (createPostLink) createPostLink.style.display = 'inline-block';
    if (logoutBtn) {
      logoutBtn.style.display = 'inline-block';
      logoutBtn.removeEventListener('click', onLogout);
      logoutBtn.addEventListener('click', onLogout);
    }
    showCreatePostForm();
  } else {
    if (createPostLink) createPostLink.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'none';
    hideCreatePostForm();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('App loaded');
  console.log('Current pathname:', window.location.pathname);
  console.log('Token:', localStorage.getItem('token'));

  updateNavigation();
  setupCreatePostFunctionality();
  
  setupHomePage();

  // Add this event listener for post clicks
  document.addEventListener('click', async (event) => {
    const postElement = event.target.closest('.post');
    if (postElement && !event.target.closest('a, button')) {
      const postId = postElement.dataset.postId;
      console.log('Post clicked, ID:', postId);
      await displaySinglePost(postId);
    }
  });

  // Check if single post container exists
  const singlePostContainer = document.getElementById('single-post-container');
  if (singlePostContainer) {
  }

  router(window.location.pathname);

  window.addEventListener('popstate', () => {
    console.log('Navigation occurred');
    router(window.location.pathname);
    updateNavigation();
  });
});

export { updateNavigation };