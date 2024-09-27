import { API_BASE } from "../constants.js";
import { headers } from "../headers.js";

export async function deletePost(id) {
    console.log(`Deleting post with ID: ${id}`);
    const response = await fetch(`${API_BASE}/social/posts/${id}`, {
        method: 'DELETE',
        headers: headers()
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true; // The API might not return any content for a successful delete
}