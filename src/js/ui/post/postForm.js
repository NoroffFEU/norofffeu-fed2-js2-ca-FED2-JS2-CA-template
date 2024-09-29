// src/js/ui/post/postForm.js

import { createPost, updatePost, deletePost } from '../../api/post.js';
import { handleFormSubmit } from '../form.js';
import { displayError } from '../../utilities/errorHandler.js';

export async function onCreatePost(event) {
  const data = handleFormSubmit(event);
  const { title, body, tags } = data;

  if (!title || !body) {
    displayError('Title and Body are required fields.');
    return;
  }

  try {
    const post = await createPost({ title, body, tags });
    window.location.href = window.location.href = `/post/index.html/?id=${post.id}`;
  } catch (error) {
    displayError(error.message || 'Failed to create post.');
  }
}

export async function onUpdatePost(event, postId) {
  const data = handleFormSubmit(event);
  const { title, body, tags } = data;

  if (!title || !body) {
    displayError('Title and Body are required fields.');
    return;
  }

  try {
    await updatePost(postId, { title, body, tags });
    window.location.href = `/post/index.html/?id=${post.id}`;
  } catch (error) {
    displayError(error.message || 'Failed to update post.');
  }
}

export async function onDeletePost(event, postId) {
  event.preventDefault();

  if (!confirm('Are you sure you want to delete this post?')) {
    return;
  }

  try {
    await deletePost(postId);
    window.location.href = '/';
    alert('Post deleted successfully');
  } catch (error) {
    displayError(error.message || 'Failed to delete post.');
  }
}
