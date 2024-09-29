// src/js/api/profile/update.js

import { API_BASE } from "../constants.js";
import { headers } from "../headers.js";

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