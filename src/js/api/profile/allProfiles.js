// src/js/api/profile/getAllProfiles.js

import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

export async function getAllProfiles(page = 1, limit = 10) {
  try {
    const response = await fetch(`${API_SOCIAL_PROFILES}?page=${page}&limit=${limit}`, {
      headers: headers()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profiles');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all profiles:", error);
    throw error;
  }
}