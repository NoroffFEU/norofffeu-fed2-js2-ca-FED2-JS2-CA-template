import { API_BASE } from "../constants.js";
import { headers } from "../headers.js";

export async function readPosts(limit = 12, page = 1, tag) {
    const queryParams = new URLSearchParams({ limit, page, _author: 'true' });
    if (tag) queryParams.append("_tag", tag);
  
    console.log('Headers:', Object.fromEntries(headers().entries()));
  
    const response = await fetch(`${API_BASE}/social/posts?${queryParams}`, {
      headers: headers(),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return await response.json();
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