// src/js/ui/navigation.js

import { currentUser } from '../utilities/currentUser.js';
import { logout } from '../api/auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const user = currentUser();
  const nav = document.getElementById('navigation');

  if (user) {
    // If user is logged in, show profile and logout links
    nav.innerHTML = `
      <a href="/">Home</a>
      <a href="/profile/index.html">Profile</a>
      <a href="#" id="logout">Logout</a>
    `;

    // Attach logout event listener
    document.getElementById('logout').addEventListener('click', () => {
      logout();
    });
  } else {
    // If user is not logged in, show login and register links
    nav.innerHTML = `
      <a href="/">Home</a>
      <a href="/auth/login/index.html">Login</a>
      <a href="/auth/register/index.html">Register</a>
    `;
  }
});
