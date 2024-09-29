// src/js/api/auth/login.js

import { API_AUTH_LOGIN } from '../constants.js';
import { headers } from '../headers.js';

export async function loginUser(data) {
    console.log("Login Data:", data);  // Log the data being sent
  
    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: headers(true),  // Ensure Content-Type is set to application/json
      body: JSON.stringify(data),  // Convert the data to JSON string
    });
  
    if (response.ok) {
      const result = await response.json();
      return result.data;  // Return only the `data` part of the response
    }
  
    const errorData = await response.json();
    console.error("Login Error Response:", errorData);  // Log the server error response
    throw new Error(errorData.message || "Couldn't login");
  }
  
