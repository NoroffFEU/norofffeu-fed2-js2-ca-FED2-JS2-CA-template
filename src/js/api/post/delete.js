import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

export async function deletePost(id) {
    if (!id) {
        throw new Error("Post ID is required for deletion");
    }

    const url = `${API_SOCIAL_POSTS}/${id}`;
    
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: headers()
        });

        if (response.ok) {
            console.log('Post successfully deleted');
            return true;
        } else {
            const errorData = await response.json();
            console.error('Failed to delete post:', errorData);
            throw new Error(errorData.errors?.[0]?.message || 'Failed to delete post');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
}