import { API_BASE } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Updates a post with the specified ID.
 * 
 * This function sends a PUT request to the API to update a post.
 * It requires an authentication token, which it retrieves from localStorage.
 * 
 * @async
 * @function updatePost
 * @param {number} id - The ID of the post to update.
 * @param {Object} postData - The updated post data.
 * @throws {Error} Throws an error if the post update fails or if there's a network issue.
 * @returns {Promise<Object>} A promise that resolves to the updated post data.
 * 
 * @example
 * try {
 *   const updatedPost = await updatePost(123, { title: 'New Title' });
 *   console.log('Post updated:', updatedPost);
 * } catch (error) {
 *   console.error('Failed to update post:', error);
 * }
 */

export async function updatePost(id, postData) {
    console.log("Updating post with ID:", id);
    console.log("Sending post data:", postData);

    const response = await fetch(`${API_BASE}/social/posts/${id}`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(postData)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error response:", errorData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
}