// src/js/api/post/create.js

import { headers } from '/src/js/api/headers.js';
import { API_SOCIAL_POSTS } from '/src/js/api/constants.js';  // Ensure correct import path
import { currentUser } from '/src/js/utilities/currentUser.js';

// Create Post Function
export async function createPost(data) {
    // Check if the user is logged in
    const user = currentUser();
    if (!user) {
        throw new Error("User not authenticated");
    }

    // Log the user and data being sent
    console.log("Authenticated user:", user);
    console.log("Data being sent to API:", data);

    // Make the API request
    try {
        const response = await fetch(API_SOCIAL_POSTS, {
            method: 'POST',
            headers: headers(true), // Ensure headers include Content-Type and Authorization
            body: JSON.stringify(data), // Convert the data object to JSON string
        });

        // Check response status
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response from API:", errorData);
            throw new Error(errorData.message || "Post creation failed");
        }

        // Parse and log the response
        const result = await response.json();
        console.log("Successful response from API:", result);

        return result;
    } catch (error) {
        console.error("Create Post Error:", error.message);
        throw new Error("Failed to create post: " + error.message);
    }
}
