import { login } from '../../api/auth/login.js';
import { updateNavigation } from '../../../app.js';

/**
 * Sets up the login form by attaching an event listener to handle form submission.
 * 
 * @function setupLoginForm
 * @returns {void}
 * 
 * @example
 * // Call this function when the login page loads
 * setupLoginForm();
 */

export function setupLoginForm() {
  console.log('Setting up login form');
  const form = document.querySelector('#login-form');
   
  if (form) {
    console.log('Login form found');
    form.addEventListener('submit', onLogin);
  } else {
    console.error('Login form not found');
  }
}

/**
 * Handles the login form submission.
 * 
 * This function prevents the default form submission, extracts the email and password
 * from the form, attempts to log in the user, and handles the response. On successful
 * login, it stores the user data in localStorage, updates navigation, and redirects to the home page.
 * 
 * @async
 * @function onLogin
 * @param {Event} event - The submit event from the login form.
 * @returns {Promise<void>}
 * @throws {Error} Throws an error if login fails or if the response is in an unexpected format.
 */ 

async function onLogin(event) {
  console.log('onLogin function called');
  event.preventDefault();
  console.log('Login form submitted');
 
  const form = event.target;
  const email = form.email.value;
  const password = form.password.value;
 
  try {
    console.log('Attempting to log in with:', { email });
    const data = await login(email, password);
    
    const accessToken = data.accessToken || data.data?.accessToken;
    if (!accessToken) {
      console.error('Response structure:', JSON.stringify(data, null, 2));
      throw new Error('No access token received in the expected format');
    }
    
    localStorage.setItem('token', accessToken);
    
    // Store individual user properties
    const user = data.user || data.data?.user || data;
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
    localStorage.setItem('user', JSON.stringify(user));
    
    console.log('Token stored in localStorage:', localStorage.getItem('token'));
    console.log('Name stored in localStorage:', localStorage.getItem('name'));
    console.log('Email stored in localStorage:', localStorage.getItem('email'));
    console.log('User stored in localStorage:', localStorage.getItem('user'));
    
    updateNavigation(); // Call this after setting the token
    
    window.location.href = '/';  // Redirect to profile page instead of home
  } catch (error) {
    console.error('Login failed:', error);
    alert(`Login failed: ${error.message}`);
  }
}

export default setupLoginForm;