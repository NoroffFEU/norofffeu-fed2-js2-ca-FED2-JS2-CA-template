import { API_SOCIAL_POSTS } from "../constants.js";

/**
 * Function to delete a post by ID.
 * @param {string} id - The ID of the post to delete.
 * @returns {boolean} - True if the post was deleted successfully, throws an error otherwise.
 * @throws {Error} - Throws an error if deletion fails.
 */
export async function deletePost(id) {
    // Retrieve the token from localStorage
    const accessToken = localStorage.getItem('accessToken');

    // Confirm with the user before deleting
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return; // Exit if the user cancels

    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        // Check if the deletion was successful
        if (response.ok) {
            alert("Post deleted successfully.");
            window.location.href = "/"; // Redirect to the main feed or homepage
            return true;
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage || 'Failed to delete post.');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post: ' + error.message);
        throw error;
    }
}
