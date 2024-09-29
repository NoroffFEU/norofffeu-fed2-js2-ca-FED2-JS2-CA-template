// src/js/api/post.js

import { API_SOCIAL_POSTS } from '/src/js/api/constants.js';
import { headers } from '/src/js/api/headers.js';
import { currentUser } from '/src/js/utilities/currentUser.js';

// Create a new post
export async function createPost(data) {
  const user = currentUser();

  if (!user || !user.token) {
    console.error("User is not logged in or token is missing. Redirecting to login.");
    window.location.href = "/auth/login/index.html"; // Redirect to login page
    return; // Prevent further execution if no user or token
  }

  const response = await fetch(API_SOCIAL_POSTS, {
    method: 'POST',
    headers: headers(true), // Ensure `Content-Type` is `application/json` and Authorization is included
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Post creation failed');
  }

  const result = await response.json();
  return result.data; // Assuming `data` contains the newly created post
}

// Read a specific post by ID
export async function readPost(id) {
  const user = currentUser();

  if (!user || !user.token) {
    console.error("User is not logged in or token is missing. Redirecting to login.");
    window.location.href = "/auth/login/index.html"; // Redirect to login page
    return; // Prevent further execution if no user or token
  }
  const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
    method: 'GET',
    headers: headers(), // Use headers() to include the API key and Authorization
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Post not found');
  }

  const result = await response.json();
  return result.data; // Assuming `data` contains the post details
}

// Read multiple posts with pagination support
export async function readPosts(limit = 12, page = 1) {
  const user = currentUser();

  if (!user || !user.token) {
    console.error("User is not logged in or token is missing. Redirecting to login.");
    window.location.href = "/auth/login/index.html"; // Redirect to login page
    return; // Prevent further execution if no user or token
  }
  
  const response = await fetch(`${API_SOCIAL_POSTS}?limit=${limit}&page=${page}`, {
    method: 'GET',
    headers: headers(), // Use headers() to include the API key and Authorization
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to load posts');
  }

  const result = await response.json();
  return result.data; // Assuming `data` contains a list of posts
}

// Update a post by ID
export async function updatePost(id, data) {
  const user = currentUser();

  if (!user || !user.token) {
    console.error("User is not logged in or token is missing. Redirecting to login.");
    window.location.href = "/auth/login/index.html"; // Redirect to login page
    return; // Prevent further execution if no user or token
  }
  const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
    method: 'PUT',
    headers: headers(true), // Ensure `Content-Type` is `application/json` and Authorization is included
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update post');
  }

  const result = await response.json();
  return result.data; // Assuming `data` contains the updated post details
}

// Delete a post by ID
export async function deletePost(id) {
  const user = currentUser();

  if (!user || !user.token) {
    console.error("User is not logged in or token is missing. Redirecting to login.");
    window.location.href = "/auth/login/index.html"; // Redirect to login page
    return; // Prevent further execution if no user or token
  }
  const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
    method: 'DELETE',
    headers: headers(), // Use headers() to include the API key and Authorization
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete post');
  }

  return true; // Return true if deletion was successful
}
