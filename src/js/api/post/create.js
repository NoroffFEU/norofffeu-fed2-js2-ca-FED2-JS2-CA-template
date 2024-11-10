import { API_URL } from "../constants.js";

/**
 * Creates a new post using the provided post data.
 * 
 * This function sends a POST request to the API to create a new post.
 * It requires an authentication token, which it retrieves from localStorage.
 * 
 * @async
 * @function createPost
 * @param {Object} postData - The data for the post to be created.
 * @param {string} postData.title - The title of the post.
 * @param {string} postData.body - The body content of the post.
 * @param {string[]} [postData.tags] - Optional tags for the post.
 * @throws {Error} Throws an error if the post creation fails or if there's a network issue.
 * @returns {Promise<Object>} A promise that resolves to the created post data returned by the API.
 * 
 * @example
 * try {
 *   const newPost = await createPost({
 *     title: "My New Post",
 *     body: "This is the content of my new post.",
 *     tags: ["news", "tech"]
 *   });
 *   console.log('Post created:', newPost);
 * } catch (error) {
 *   console.error('Failed to create post:', error);
 * }
 */

export async function createPost(postData) {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error('Failed to create post');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}