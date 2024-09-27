import { API_SOCIAL_POSTS } from "../../config/api";

export async function updatePost(id, { title, body, tags, media }) {
    const postBody = JSON.stringify({ title, body, tags, media });
    
    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
        headers: headers(),
        method: "PUT",
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
        console.error("An error occurred during updating a post:", error);
        throw error;
    }
}
