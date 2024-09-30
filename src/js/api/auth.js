// src/js/api/auth.js

import { API_AUTH_LOGIN, API_AUTH_REGISTER } from './constants.js';
import { headers } from './headers.js';

// Function for user login
export async function login(data) {
  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: 'POST',
      headers: headers(true), // Use headers with Content-Type and Authorization
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    // Log the full response for debugging
    const userData = await response.json();
    console.log('Login Response:', userData);

    // Store user and token in local storage correctly
    const { accessToken, ...user } = userData;
    localStorage.setItem('user', JSON.stringify(user)); // Store the user object
    localStorage.setItem('token', accessToken); // Store the token separately
    console.log('User data stored successfully:', user);

    return { user, accessToken };
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Login failed: ' + error.message);
  }
}

// Function for user registration
export async function register(data) {
  try {
    // Use headers without the Authorization header for registration
    const response = await fetch(API_AUTH_REGISTER, {
      method: 'POST',
      headers: headers(true), // Include Content-Type but exclude Authorization
      body: JSON.stringify(data),
    });

    // Check if the response is not OK
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    // Parse the response JSON
    const responseData = await response.json();
    console.log("Registration Response Data:", responseData);

    // Check if the response structure matches what we expect
    const userData = responseData.data || responseData; // Adjust if response structure varies

    // Log the userData for debugging
    console.log("User Data:", userData);

    // Store user and token in localStorage
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('token', userData.accessToken);

    console.log('User and token successfully stored in localStorage.');

    return userData;
  } catch (error) {
    console.error('Error during registration:', error.message);
    throw new Error('Registration failed: ' + error.message);
  }
}