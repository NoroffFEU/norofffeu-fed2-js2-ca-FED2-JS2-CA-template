import { headers } from "../headers";
import { API_KEY, API_SOCIAL_POSTS, API_SOCIAL_PROFILES } from "../constants";
import { getToken } from "../../utilities/token";
const token = getToken();

export async function readProfiles(limit, page) {
  const response = await fetch(
    `${API_SOCIAL_POSTS}?_author=true&_comments=true&_reactions=true&limit=${limit}&page=${page}`,
    {
      method: "GET",
      headers: {
        ...headers(),
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
}

export async function readProfile(username) {
  const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile data");
  }

  return await response.json();
}
