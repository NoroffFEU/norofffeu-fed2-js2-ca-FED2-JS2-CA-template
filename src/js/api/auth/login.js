import { API_AUTH_LOGIN } from '../constants';
import { storeToken } from './key';

export async function loginUser(email, password) {
    // Input validation
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    try {
        const response = await fetch(API_AUTH_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Login successful:', data);
            storeToken(data.token); // Store the JWT token in local storage
            return { success: true, user: data.user }; // Assuming the API returns user data
        } else {
            console.error('Login failed:', data.message);
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error('Error during login:', error);
        return { success: false, message: 'An unexpected error occurred' };
    }
}
