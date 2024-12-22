import { login } from '../../api/auth/login.js';

// This function is called when the login form is submitted.
// Calls login function from API, redirects to home page on success.
export async function onLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const loginData = {
        email: email,
        password: password,
    };
    
    try {
        const response = await login(loginData);
        console.log(response);
        window.location.href = '/';
    } catch (error) {
        console.error('An error occurred during login:', error);
        alert(error.message);
    }
}

