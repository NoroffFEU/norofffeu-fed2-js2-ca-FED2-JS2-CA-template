console.log('Login.js file loaded');

import { API_AUTH_LOGIN, API_KEY } from '../../api/constants.js';

function setupLoginForm() {
  console.log("Setting up login form");
  const form = document.querySelector('form[name="login"]');
  if (form) {
    console.log("Form found, attaching event listener");
    form.addEventListener("submit", onLogin);
  } else {
    console.error("Login form not found");
  }
}

async function onLogin(event) {
  event.preventDefault();
  console.log('Login form submitted - event prevented');

  const form = event.target;
  const email = form.email.value;
  const password = form.password.value;

  console.log('Attempting to log in with:', { email });

  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': API_KEY
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('Response received:', response.status, response.statusText);

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    console.log('Login successful, data received:', data);

    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('user', JSON.stringify(data.user));

    console.log('Token and user data stored in localStorage');
    
    window.location.href = '/';
  } catch (error) {
    console.error('Login failed:', error);
    alert('Login failed. Please check your credentials and try again.');
  }
}

function loginView() {
  console.log('Login view loaded');
  setupLoginForm();
}

loginView();

export default loginView;