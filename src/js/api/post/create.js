import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";


export async function createPost({ title, body }) {
    const postBody = JSON.stringify({ title, body });
    
    try {
        const response = await fetch(API_SOCIAL_POSTS, {
        headers: headers(),
        method: "POST",
        body: postBody,
        });
    
        if (response.ok) {
        const data = await response.json();
        return data;
        } else {
        const errorData = await response.json(); // Handle error response from API
        throw new Error(errorData.message || "Uh oh, something went wrong");
        }
    
    } catch (error) {
        console.error("An error occurred during creating a new post:", error);
        throw error;
    }
}
