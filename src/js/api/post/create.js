// export async function createPost({ title, body, tags, media }) {}
// src/api/post/create.js
import { API_SOCIAL_POSTS } from "../constants.js"; // Import the API endpoint
import { headers } from "../headers.js"; // Import headers function

export async function createPost({ title, body, tags, media }) {
    const postData = { title, body, tags, media }; // Prepare post data

    try {
        const response = await fetch(API_SOCIAL_POSTS, {
            method: "POST",
            headers: {
                ...headers(), // Add any additional headers if necessary
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData), // Send post data as JSON
        });

        return response; // Return the response
    } catch (error) {
        console.error("Error creating post:", error);
        throw error; // Rethrow the error for further handling
    }
}