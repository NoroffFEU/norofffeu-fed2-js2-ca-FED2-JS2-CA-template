import { headers } from './headers.js';
import { API_SOCIAL_POSTS } from './constants.js';

// Create new post
export async function createPost(data) {
  const response = await fetch(API_SOCIAL_POSTS, {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create post');
  return await response.json();
}

// Get a specific post by ID
export async function readPost(id) {
  const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
    method: 'GET',
    headers: headers(true),
  });
  if (!response.ok) throw new Error('Failed to fetch post');
  return await response.json();
}

// Update a post by ID
export async function updatePost(id, data) {
  const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
    method: 'PUT',
    headers: headers(true),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update post');
  return await response.json();
}

// Delete a post by ID
export async function deletePost(id) {
  const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
    method: 'DELETE',
    headers: headers(true),
  });
  if (!response.ok) throw new Error('Failed to delete post');
  return await response.json();
}
