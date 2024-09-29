import router from "./js/router/index.js";
import { onLogout } from "./js/ui/auth/logout.js";
import { setupCreatePostFunctionality, showCreatePostForm, hideCreatePostForm } from "./js/ui/post/create.js";
import { setupHomePage, displaySinglePost } from "./js/ui/post/list.js";

function updateNavigation() {
  const token = localStorage.getItem('token');
  const loginLink = document.getElementById('login-link');
  const registerLink = document.getElementById('register-link');
  const logoutBtn = document.getElementById('logout-btn');
  const profileLink = document.getElementById('profile-link');
  const createPostLink = document.getElementById('createPostLink');

  console.log('Updating navigation. Token:', token);

  if (token) {
    // User is logged in
    if (loginLink) loginLink.style.display = 'none';
    if (registerLink) registerLink.style.display = 'none';
    if (logoutBtn) {
      logoutBtn.style.display = 'inline-block';
      logoutBtn.removeEventListener('click', onLogout);
      logoutBtn.addEventListener('click', onLogout);
    }
    if (profileLink) profileLink.style.display = 'inline-block';
    if (createPostLink) createPostLink.style.display = 'inline-block';
    if (document.getElementById('create-post-form')) {
      showCreatePostForm();
    }
  } else {
    // User is logged out
    if (loginLink) loginLink.style.display = 'inline-block';
    if (registerLink) registerLink.style.display = 'inline-block';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (profileLink) profileLink.style.display = 'none';
    if (createPostLink) createPostLink.style.display = 'none';
    if (document.getElementById('create-post-form')) {
      hideCreatePostForm();
    }
  }
}

function isAuthenticated() {
  const token = localStorage.getItem('token');
  console.log('Checking authentication. Token:', token);
  return !!token;
}

function isProtectedRoute(path) {
  const protectedRoutes = ['/profile/', '/post/create/', '/post/edit/'];
  return protectedRoutes.some(route => path.startsWith(route));
}

function handleRoute(path) {
  console.log('Handling route:', path);
  const token = localStorage.getItem('token');
  
  if (!token && isProtectedRoute(path)) {
    console.log('Unauthenticated user trying to access protected route');
    sessionStorage.setItem('intendedPath', path);
    window.location.href = '/auth/login/';
  } else if (path === '/auth/login/' && token) {
    console.log('Authenticated user trying to access login page, redirecting to home');
    window.location.href = '/';
  } else {
    console.log('Routing to:', path);
    router(path);
    updateNavigation();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('App loaded');
  console.log('Current pathname:', window.location.pathname);
  console.log('Token:', localStorage.getItem('token'));

  updateNavigation();

  if (document.getElementById('create-post-form')) {
    setupCreatePostFunctionality();
  }

  if (document.getElementById('posts-container')) {
    setupHomePage();
  }

  // Add this event listener for post clicks
  document.addEventListener('click', async (event) => {
    const postElement = event.target.closest('.post');
    if (postElement && !event.target.closest('a, button')) {
      const postId = postElement.dataset.postId;
      console.log('Post clicked, ID:', postId);
      await displaySinglePost(postId);
    }
  });

  // Handle initial route
  handleRoute(window.location.pathname);

  // Handle navigation
  window.addEventListener('popstate', () => {
    console.log('Navigation occurred');
    handleRoute(window.location.pathname);
  });
});

export { updateNavigation };