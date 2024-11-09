import { API_SOCIAL_POSTS, API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Fetches a single post by ID.
 * @param {number} id - The ID of the post to fetch.
 * @param {boolean} includeAuthor - Whether to include the author's information.
 * @returns {Object} - The fetched post data.
 * @throws {Error} - Throws an error if fetching the post fails.
 */
export async function readPost(id, includeAuthor = true) {
    // Ensure the ID is a valid number
    if (isNaN(id)) {
        throw new Error("Invalid post ID: must be a number");
    }

    const queryParams = new URLSearchParams({ _author: includeAuthor.toString() });
    const endpoint = `${API_SOCIAL_POSTS}/${id}?${queryParams.toString()}`;

    try {
        const response = await fetch(endpoint, {
            headers: headers(),
            method: "GET",
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error("Failed to fetch post: " + errorText);
        }

        const postData = await response.json();
        return postData; // Return post data directly
    } catch (error) {
        console.error("Fetching post failed:", error);
        throw error;
    }
}

/**
 * Fetches a paginated list of posts with optional tag filtering.
 * @param {number} limit - The number of posts per page.
 * @param {number} page - The page number to retrieve.
 * @param {string} tag - Optional tag to filter posts.
 * @returns {Object} - The fetched posts data.
 * @throws {Error} - Throws an error if fetching posts fails.
 */
export async function readPosts(limit = 12, page = 1, tag) {
    const endpoint = new URL(API_SOCIAL_POSTS);
    endpoint.searchParams.append("_author", "true");
    endpoint.searchParams.append("limit", limit);
    endpoint.searchParams.append("page", page);

    if (tag) {
        endpoint.searchParams.append("tag", tag);
    }

    try {
        const response = await fetch(endpoint, {
            headers: headers(),
            method: "GET",
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error("Failed to fetch posts: " + errorText);
        }

        const postsData = await response.json();
        return postsData; // Return posts data directly
    } catch (error) {
        console.error("Fetching posts failed:", error);
        throw error;
    }
}

/**
 * Fetches posts by a specific user with pagination and optional tag filtering.
 * @param {string} username - The username whose posts to fetch.
 * @param {number} limit - The number of posts per page.
 * @param {number} page - The page number to retrieve.
 * @param {string} tag - Optional tag to filter posts.
 * @returns {Object} - The fetched posts data by the user.
 * @throws {Error} - Throws an error if fetching user posts fails.
 */
export async function readPostsByUser(username, limit = 12, page = 1, tag) {
    const endpoint = new URL(`${API_SOCIAL_PROFILES}/${username}/posts`);
    endpoint.searchParams.append("_author", "true");
    endpoint.searchParams.append("limit", limit);
    endpoint.searchParams.append("page", page);

    if (tag) {
        endpoint.searchParams.append("tag", tag);
    }

    try {
        const response = await fetch(endpoint, {
            headers: headers(),
            method: "GET",
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error("Failed to fetch posts: " + errorText);
        }

        const postsData = await response.json();
        return postsData; // Return posts data directly
    } catch (error) {
        console.error("Fetching posts failed:", error);
        throw error;
    }
}
