// src/js/ui/auth/register.js
import api from '../../api/index.js';
export async function onRegister(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Grab form data
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
  
    try {
      // Delegate the registration action to the API
      const response = await api.auth.register(data);
      
      // After successful registration, you could store user or token if needed
      const { user, token } = response;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      // Handle success
      alert('Registration successful!');
      window.location.href = '/auth/login/index.html';  // Redirect to login page after registration
    } catch (error) {
      // Handle error
      alert('Registration failed: ' + error.message);
    }
  }

  // Ensure the event listener is attached once the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("registerForm").addEventListener("submit", onRegister);
});