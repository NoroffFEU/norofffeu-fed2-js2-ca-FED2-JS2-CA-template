// src/js/api/auth.js

import { API_AUTH_LOGIN, API_AUTH_REGISTER } from './constants.js';
import { headers } from './headers.js';

export async function login(data) {
  const response = await fetch(API_AUTH_LOGIN, {
    method: 'POST',
    headers: headers(false), // Set includeAuth as false since no Authorization is needed for login
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  const result = await response.json();
  return result.data; // Assuming `data` contains user and token
}

export async function register(data) {
  const response = await fetch(API_AUTH_REGISTER, {
    method: 'POST',
    headers: headers(false), // Set includeAuth as false since no Authorization is needed for registration
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }

  const result = await response.json();
  return result.data; // Assuming `data` contains user and token
}
