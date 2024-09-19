// src/js/api/auth/login.js

import { API_AUTH_LOGIN, API_KEY } from '../constants.js';

export async function login({email, password}) {
    const response = await fetch(API_AUTH_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Noroff-API-Key': API_KEY
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
}