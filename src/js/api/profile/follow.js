// src/js/api/profile/follow.js

import { API_BASE } from "../constants.js";
import { headers } from "../headers.js";

export async function followUser(profileName) {
  const response = await fetch(`${API_BASE}/social/profiles/${profileName}/follow`, {
    method: 'PUT',
    headers: headers()
  });

  if (!response.ok) {
    throw new Error('Failed to follow user');
  }

  return await response.json();
}

export async function unfollowUser(profileName) {
  const response = await fetch(`${API_BASE}/social/profiles/${profileName}/unfollow`, {
    method: 'PUT',
    headers: headers()
  });

  if (!response.ok) {
    throw new Error('Failed to unfollow user');
  }

  return await response.json();
}