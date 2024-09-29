// src/js/api/auth/register.js

import api from "../../api/instance.js";


const api = NoroffAPI();

// Function to handle the API registration request
export async function onRegister(event) {
  document.forms.register.addEventListener("submit", async (event) => {
    event.preventDefault();  // Prevent the default form submission behavior

    const formData = new FormData(event.target);  // Get the form data
    const data = Object.fromEntries(formData.entries());  // Convert to an object

    try {
      await api.auth.register(data);  // Call the register method from your API class
      alert('Registration successful!');
      window.location.href = "/auth/login/index.html";  // Redirect to login page
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
  });
}
