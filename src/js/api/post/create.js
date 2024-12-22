import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

// Creates a new post with POST method to API_SOCIAL_POSTS
export async function createPost({ title, content }) {
    const postBody = JSON.stringify({ title, body: content });
    
    try {
        const response = await fetch(API_SOCIAL_POSTS, {
        headers: headers(),
        method: "POST",
        body: postBody,
        });
    
        if (response.ok) {
        const responseBody = await response.json();
        return responseBody.data;
        } else {
        const errorData = await response.json(); // Handle error response from API
        throw new Error(errorData.message || "Uh oh, something went wrong");
        }
    
    } catch (error) {
        console.error("An error occurred during creating a new post:", error);
        throw error;
    }
}
