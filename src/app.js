// src/app.js
import router from "./js/router/index.js";

document.addEventListener('DOMContentLoaded', () => {
  console.log('App loaded');
  console.log('Current pathname:', window.location.pathname);
  console.log('Token:', localStorage.getItem('token'));

  // Initial route
  router(window.location.pathname);

  // Handle navigation
  window.addEventListener('popstate', () => {
    console.log('Navigation occurred');
    router(window.location.pathname);
  });
});