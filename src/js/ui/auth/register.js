// src/js/ui/auth/register.js

import { register } from '../../api/auth.js';

export async function onRegister(event) {
  event.preventDefault(); // Prevent default form submission

  // Get form data and convert it to an object
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Log form data for debugging
  console.log('Form Data:', data);

  try {
    // Call the register function and handle the response
    const userData = await register(data);
    console.log('Registration successful:', userData);

    // Log the localStorage values to ensure they are correctly set
    console.log('Stored User:', localStorage.getItem('user'));
    console.log('Stored Token:', localStorage.getItem('token'));

    // Redirect to the login page after successful registration
    window.location.href = '/auth/login/index.html';
  } catch (error) {
    console.error('Error during registration:', error.message);
    alert(`Registration failed: ${error.message}`);
  }
}

// Attach the event listener to the form on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  if (form) {
    form.addEventListener('submit', onRegister);
  } else {
    console.error("Registration form not found in the DOM.");
  }
});
