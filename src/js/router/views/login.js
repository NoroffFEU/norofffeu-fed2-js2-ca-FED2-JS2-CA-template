import { onLogin } from '../../ui/auth/login.js';

/**
 * Sets up and renders the login view of the application.
 * 
 * This function initializes the login page by calling the setupLoginForm function.
 * 
 * @function loginView
 * @returns {void}
 * 
 * @example
 * // Call this function when the login page loads
 * loginView();
 */

export default function loginView() {
    console.log('Login view loaded');
    setupLoginForm();
}

/**
 * Sets up the login form event listener.
 * 
 * This function attaches a submit event listener to the login form.
 * When the form is submitted, it prevents the default form submission
 * and calls the onLogin function.
 * 
 * @function setupLoginForm
 * @returns {void}
 * 
 * @example
 * // Call this function when the login form loads
 * setupLoginForm();
 */

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

loginView();