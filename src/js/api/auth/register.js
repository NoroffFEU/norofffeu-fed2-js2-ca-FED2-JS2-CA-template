import { API_AUTH_REGISTER } from '../constants';
import { storeToken } from './key';

export async function registerUser(username, email, password) {
    // Input validation
    if (!username || !email || !password) {
        throw new Error('Username, email, and password are required');
    }

    try {
        const response = await fetch(API_AUTH_REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            console.log('Registration successful:', data);
            storeToken(data.token); // Store JWT token if provided
            return { success: true, user: data.user }; // Return more specific data
        } else {
            console.error('Registration failed:', data.message);
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error('Error during registration:', error);
        return { success: false, message: 'An unexpected error occurred' };
    }
}

