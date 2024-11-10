import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Fetches the profile data for a given user from the API, including their posts, followers, and following data.
 * 
 * @async
 * @function readProfile
 * @param {string} name - The username of the profile to retrieve.
 * @returns {Promise<Object>} - Returns a Promise that resolves to the profile data object.
 * @throws {Error} - Throws an error if the API request fails or returns a non-OK status.
 */

export async function readProfile(name) {
    try {
        const response = await fetch(`${API_SOCIAL_PROFILES}/${name}?_following=true&_followers=true&_posts=true`, {
            headers: headers()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }

        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error("Error reading profile:", error);
        throw error;
    }
}