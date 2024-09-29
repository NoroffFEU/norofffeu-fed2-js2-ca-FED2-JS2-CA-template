import { API_BASE } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Reads a list of posts from the API.
 * 
 * This function sends a GET request to the API to read a list of posts.
 * It supports pagination and filtering by tag.
 * 
 * @async
 * @function readPosts
 * @param {number} [limit=12] - The maximum number of posts to return.
 * @param {number} [page=1] - The page number to read.
 * @param {string} [tag] - An optional tag to filter posts by.
 * @throws {Error} Throws an error if the request fails or if there's a network issue.
 * @returns {Promise<Object>} A promise that resolves to the list of posts returned by the API.
 * 
 * @example
 * try {
 *   const posts = await readPosts(12, 1, 'news');
 *   console.log('Posts:', posts);
 * } catch (error) {
 *   console.error('Failed to read posts:', error);
 * }
 */

export async function readPosts(limit = 12, page = 1, tag) {
  const queryParams = new URLSearchParams({ limit, page, _author: 'true' });
  if (tag) queryParams.append("_tag", tag);
  
  console.log('Headers:', Object.fromEntries(headers().entries()));
  
  try {
    const response = await fetch(`${API_BASE}/social/posts?${queryParams}`, {
      headers: headers(),
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.log('User is not authenticated. Returning empty posts array.');
        return { data: [] };
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error reading posts:', error);
    return { data: [] };
  }
}
  export async function readPost(id) {
    console.log(`Fetching post with ID: ${id}`);
    const response = await fetch(`${API_BASE}/social/posts/${id}?_author=true&_comments=true&_reactions=true`, {
      headers: headers(),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    console.log("Received post data:", data);
    return data;
  }
export async function readPostsByUser(username, limit = 12, page = 1, tag) {
  const queryParams = new URLSearchParams({ limit, page });
  if (tag) queryParams.append("_tag", tag);

  const response = await fetch(`${API_BASE}/social/profiles/${username}/posts?${queryParams}`, {
    headers: headers(),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}