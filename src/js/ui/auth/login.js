// src/js/ui/auth/login.js

import NoroffAPI from '../../api/index.js';

const api = new NoroffAPI();
console.log(api.auth);
export async function onLogin(event) {
    event.preventDefault();  // Prevent form submission
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());  // Collect form data
  
    try {
      // Delegate the login action to the API and get the response
      const response = await api.auth.login(data);  // Updated variable name for clarity
      
      // After successful login, store user information (from the server response) in local storage
      const { user, token } = response;  // Destructure accessToken from the user data
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
  
      // Redirect to the dashboard page
      window.location.href = '/profile/index.html';
    } catch (error) {
      // Handle error and display an appropriate message
      alert('Login failed: ' + error.message);
    }
  }
  
  

// Ensure the event listener is attached once the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginForm").addEventListener("submit", onLogin);
  });
