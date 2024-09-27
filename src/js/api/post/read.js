
const API_URL = "https://v2.api.noroff.dev/social/posts";



// Fetch a single post by ID (if needed in the future)
export async function readPost(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch post");
    return await response.json();
  } catch (error) {
    console.error("Error reading post:", error);
  }
}

// Fetch multiple posts with optional tag filter, limit, and pagination
export async function readPosts(limit = 12, page = 1, tag) {
  try {
    let url = `${API_URL}?_limit=${limit}&_page=${page}`;
    if (tag) {
      url += `&_tag=${tag}`;
    }
    const response = await fetch(url, {
      headers: {
        "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hpcndhYyIsImVtYWlsIjoic2hpYWJkMzgzNjlAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MjczNTc5MDd9.UEUvSk-fipXHIozj7MpWRRbzWAp3dSK6W3kkNCQc9xA',
        'X-Noroff-API-Key': '9b16dd46-dba3-44c7-a516-66599a3c7358'
      }
    });
    if (!response.ok) throw new Error("Failed to fetch posts");
    return await response.json();
  } catch (error) {
    console.error("Error reading posts:", error);
  }
}

// Fetch posts by a specific user (optional function)
export async function readPostsByUser(username, limit = 12, page = 1, tag) {
  try {
    let url = `${API_URL}/user/${username}?_limit=${limit}&_page=${page}`;
    if (tag) {
      url += `&_tag=${tag}`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch posts by user");
    return await response.json();
  } catch (error) {
    console.error("Error reading posts by user:", error);
  }
}
