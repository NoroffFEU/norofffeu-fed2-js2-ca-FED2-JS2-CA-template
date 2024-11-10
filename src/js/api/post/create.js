import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

export async function createPost({ title, body, tags, media }) {
    
    const requestBody = { title, body, tags, media };
    
    console.log("Request body:", JSON.stringify(requestBody, null, 2));
    console.log("API endpoint:", API_SOCIAL_POSTS);
    
    try {
        const requestHeaders = headers();
        console.log("Request headers:", Object.fromEntries(requestHeaders.entries()));

        const response = await fetch(API_SOCIAL_POSTS, {
            method: "POST",
            headers: requestHeaders,
            body: JSON.stringify(requestBody),
        });

        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Response data:", data);

        if (!response.ok) {
            throw new Error(data.errors?.[0]?.message || data.message || 'Failed to create post');
        }

        return data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
}