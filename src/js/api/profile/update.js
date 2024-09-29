import { API_BASE } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Updates the profile data for a specific user. Allows updating the bio, avatar, and banner fields.
 * 
 * @async
 * @function updateProfile
 * @param {string} username - The username of the profile to be updated.
 * @param {Object} updateData - An object containing profile fields to be updated.
 * @param {string} [updateData.bio] - The updated bio for the user's profile.
 * @param {Object} [updateData.avatar] - The updated avatar object for the user's profile.
 * @param {string} [updateData.avatar.url] - The URL of the new avatar image.
 * @param {Object} [updateData.banner] - The updated banner object for the user's profile.
 * @param {string} [updateData.banner.url] - The URL of the new banner image.
 * @returns {Promise<Object>} - Returns a promise that resolves to the updated profile data object.
 * @throws {Error} - Throws an error if the API request fails or returns a non-OK status.
 */

export async function updateProfile(username, { bio, avatar, banner }) {
  const updateData = {};
  if (bio) updateData.bio = bio;
  if (avatar) updateData.avatar = avatar;
  if (banner) updateData.banner = banner;

  try {
    const response = await fetch(`${API_BASE}/social/profiles/${username}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}