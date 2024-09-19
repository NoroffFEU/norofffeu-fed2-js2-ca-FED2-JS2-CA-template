// src/js/ui/auth/login.js

import { login } from '../../api/auth/login.js';

export async function onLogin(event) {
    event.preventDefault();
    console.log('Login form submitted');

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
        console.log('Attempting to log in with:', { email, password });
        const { accessToken, ...user } = await login(email, password);

        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(user));

        console.log('Login successful, token stored');
        
        window.location.href = '/';
    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials and try again.');
    }
}