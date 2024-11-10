import { API_BASE } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Deletes a post with the specified ID.
 * 
 * This function sends a DELETE request to the API to delete a post.
 * It requires an authentication token, which it retrieves from localStorage.
 * 
 * @async
 * @function deletePost
 * @param {number} id - The ID of the post to delete.
 * @throws {Error} Throws an error if the post deletion fails or if there's a network issue.
 * @returns {Promise<boolean>} A promise that resolves to true if the post was deleted successfully.
 * 
 * @example
 * try {
 *   const deleted = await deletePost(123);
 *   console.log('Post deleted:', deleted);
 * } catch (error) {
 *   console.error('Failed to delete post:', error);
 * }
 */

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