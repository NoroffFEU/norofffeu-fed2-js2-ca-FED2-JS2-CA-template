// src/app.js
import router from "./js/router/index.js";

document.addEventListener('DOMContentLoaded', () => {
  console.log('App loaded');
  console.log('Token:', localStorage.getItem('token'));
  router(window.location.pathname);
});