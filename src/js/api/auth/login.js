import { API_AUTH_LOGIN, API_KEY } from '../constants.js';

export async function login(email, password) {
    console.log('login function called with email:', email);
    try {
        const response = await fetch(API_AUTH_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Noroff-API-Key': API_KEY
            },
            body: JSON.stringify({ email, password }),
        });

        console.log('Login response status:', response.status);

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Login error response:', errorData);
            throw new Error('Login failed');
        }

        const data = await response.json();
        console.log('Login successful, received data:', data);

        return data;
    } catch (error) {
        console.error('Error in login function:', error);
        throw error;
    }
}