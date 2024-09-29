// src/js/api/auth/key.js
import { API_AUTH_KEY } from '../constants.js'; // Import the endpoint URL for generating keys
import { headers } from '../headers.js'; // Import headers with API key

export async function getKey(name) {
  try {
    const response = await fetch(`${API_AUTH_KEY}?name=${name}`, {
      method: 'GET',
      headers: headers(), // Use the headers function to include the API key
    });

    if (!response.ok) {
      throw new Error(`Failed to get key for ${name}. Status: ${response.status}`);
    }

    const data = await response.json();
    return data.key; // Assuming the key is returned in the 'key' field of the response
  } catch (error) {
    console.error('Error getting API key:', error);
    throw error;
  }
}

