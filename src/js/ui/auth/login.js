// src/js/ui/auth/login.js

import { login } from '../../api/auth.js'; // Ensure correct import path

export async function onLogin(event) {
  event.preventDefault(); // Prevent the default form submission

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    // Call the login function and get user details
    const userData = await login(data);

    // Store user details in localStorage
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('token', userData.token);

    // Redirect to the profile or home page after successful login
    window.location.href = '/profile/index.html';
  } catch (error) {
    alert('Login failed: ' + error.message);
    console.error("Login Error:", error);
  }
}

// Attach the event listener to the form on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loginForm').addEventListener('submit', onLogin);
});
