import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

// Deletes a post with DELETE method to API_SOCIAL_POSTS
export async function deletePost(id) {
    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
            headers: headers(),
            method: "DELETE",
        });
    
        if (response.ok) {
            return true;

        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || "Uh oh, something went wrong");
        }
    
    } catch (error) {
        console.error("An error occurred during deleting this post:", error);
        throw error;
    }
}