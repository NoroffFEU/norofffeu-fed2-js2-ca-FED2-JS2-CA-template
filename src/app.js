import router from "./js/router/index.js";
import { onLogout } from "./js/ui/auth/logout.js";

function updateNavigation() {
  const token = localStorage.getItem('token');
  const createPostLink = document.getElementById('createPostLink');
  const logoutBtn = document.getElementById('logout-btn');
  
  if (token) {
    if (createPostLink) createPostLink.style.display = 'inline-block';
    if (logoutBtn) {
      logoutBtn.style.display = 'inline-block';
      // Remove any existing event listeners to avoid duplicates
      logoutBtn.removeEventListener('click', onLogout);
      // Add the event listener
      logoutBtn.addEventListener('click', onLogout);
    }
  } else {
    if (createPostLink) createPostLink.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('App loaded');
  console.log('Current pathname:', window.location.pathname);
  console.log('Token:', localStorage.getItem('token'));

  // Update navigation
  updateNavigation();

  // Initial route
  router(window.location.pathname);

  // Handle navigation
  window.addEventListener('popstate', () => {
    console.log('Navigation occurred');
    router(window.location.pathname);
    updateNavigation(); // Update navigation on page change
  });
});

export { updateNavigation };