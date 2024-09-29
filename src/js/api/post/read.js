const API_URL = "https://v2.api.noroff.dev/social/posts";

// Fetch a single post by ID (consistent approach with the login method)
export async function readPost(id) {
  try {
    const response = await fetch(
      `${API_URL}/${id}?_author=true&_comments=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Token from local storage
          "X-Noroff-API-Key": "9b16dd46-dba3-44c7-a516-66599a3c7358",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }

    return await response.json();
  } catch (error) {
    console.error("Error reading post:", error);
  }
}

// Fetch multiple posts with optional tag filter, limit, and pagination
export async function readPosts(limit = 12, page = 1, tag) {
  try {
    let url = `${API_URL}?_limit=${limit}&_page=${page}&_author=true`;
    if (tag) {
      url += `&_tag=${tag}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Token from local storage
        "X-Noroff-API-Key": "9b16dd46-dba3-44c7-a516-66599a3c7358",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await response.json();
    console.log(posts);
    return posts;
  } catch (error) {
    console.error("Error reading posts:", error);
  }
}

// Fetch posts by a specific user (consistent structure with login method)
export async function readPostsByUser(username, limit = 12, page = 1, tag) {
  try {
    let url = `${API_URL}/user/${username}?_limit=${limit}&_page=${page}`;
    if (tag) {
      url += `&_tag=${tag}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Token from local storage
        "X-Noroff-API-Key": "9b16dd46-dba3-44c7-a516-66599a3c7358",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts by user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error reading posts by user:", error);
  }
}
