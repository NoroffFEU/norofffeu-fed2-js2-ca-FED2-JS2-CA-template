/**
 * @module post/comments
 * @description Handles comment functionality for posts, including adding, displaying, and deleting comments.
 */

import { API_BASE } from "../../api/constants.js";
import { headers } from "../../api/headers.js";

/**
 * Sets up the comment functionality for a specific post.
 *
 * @function setupCommentFunctionality
 * @param {string} postId - The ID of the post to set up comments for.
 */

export function setupCommentFunctionality(postId) {
  const commentForm = document.querySelector('#commentForm');
  
  if (commentForm) {
    commentForm.addEventListener('submit', (event) => handleCommentSubmission(event, postId));
  }

  refreshComments(postId);
  setupReplyButtonListeners();
  setupDeleteCommentListeners(postId);
}

/**
 * Handles the submission of a new comment.
 *
 * @async
 * @function handleCommentSubmission
 * @param {Event} event - The form submission event.
 * @param {string} postId - The ID of the post the comment is for.
 */
async function handleCommentSubmission(event, postId) {
  event.preventDefault();
  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  
  const commentBody = form.querySelector('textarea[name="commentBody"]').value;
  const replyToId = form.querySelector('input[name="replyToId"]').value;

  try {
    await addComment(postId, commentBody, replyToId);
    form.reset();
    form.querySelector('input[name="replyToId"]').value = 'null';
    await refreshComments(postId);
  } catch (error) {
    console.error('Error adding comment:', error);
    alert('Failed to add comment. Please try again.');
  } finally {
    submitButton.disabled = false;
  }
}

/**
 * Adds a new comment to a post.
 *
 * @async
 * @function addComment
 * @param {string} postId - The ID of the post to add the comment to.
 * @param {string} body - The content of the comment.
 * @param {string|null} [replyToId=null] - The ID of the comment being replied to, if any.
 * @returns {Promise<Object>} The newly created comment object.
 * @throws {Error} If the API request fails.
 */
async function addComment(postId, body, replyToId = null) {
  const response = await fetch(`${API_BASE}/social/posts/${postId}/comment`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      body,
      replyToId: replyToId !== 'null' ? Number(replyToId) : null
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

/**
 * Refreshes the comments for a specific post.
 *
 * @async
 * @function refreshComments
 * @param {string} postId - The ID of the post to refresh comments for.
 * @throws {Error} If the API request fails.
 */

async function refreshComments(postId) {
  const response = await fetch(`${API_BASE}/social/posts/${postId}?_comments=true`, {
    headers: headers()
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  displayComments(data.data.comments, postId);
}

/**
 * Displays comments for a post.
 *
 * @function displayComments
 * @param {Array<Object>} comments - The array of comment objects to display.
 * @param {string} postId - The ID of the post the comments belong to.
 */

function displayComments(comments, postId) {
  const commentsList = document.querySelector('#commentsList');
  if (!commentsList) return;

  commentsList.innerHTML = ''; // Clear previous comments

  comments.forEach(comment => {
    const commentElement = createCommentElement(comment);
    commentsList.appendChild(commentElement);
  });

  setupReplyButtonListeners();
  setupDeleteCommentListeners(postId);
}

/**
 * Creates a DOM element for a single comment.
 *
 * @function createCommentElement
 * @param {Object} comment - The comment object to create an element for.
 * @returns {HTMLElement} The created comment element.
 */

function createCommentElement(comment) {
  const commentElement = document.createElement('div');
  commentElement.className = 'comment';
  commentElement.innerHTML = `
    <p>${comment.body}</p>
    <small>By: ${comment.owner} on ${new Date(comment.created).toLocaleString()}</small>
    <button class="reply-button" data-comment-id="${comment.id}">Reply</button>
    <button class="delete-comment-button" data-comment-id="${comment.id}">Delete</button>
  `;

  if (comment.replies && comment.replies.length > 0) {
    const replyContainer = createReplyContainer(comment.replies);
    commentElement.appendChild(replyContainer);
  }

  return commentElement;
}

/**
 * Creates a container for reply comments.
 *
 * @function createReplyContainer
 * @param {Array<Object>} replies - The array of reply objects.
 * @returns {HTMLElement} The created reply container.
 */
function createReplyContainer(replies) {
  const replyContainer = document.createElement('div');
  replyContainer.className = 'replies';
  replies.forEach(reply => {
    const replyElement = document.createElement('div');
    replyElement.className = 'reply';
    replyElement.innerHTML = `
      <p>${reply.body}</p>
      <small>By: ${reply.owner} on ${new Date(reply.created).toLocaleString()}</small>
      <button class="delete-comment-button" data-comment-id="${reply.id}">Delete</button>
    `;
    replyContainer.appendChild(replyElement);
  });
  return replyContainer;
}

/**
 * Sets up event listeners for reply buttons.
 *
 * @function setupReplyButtonListeners
 */
function setupReplyButtonListeners() {
  document.querySelectorAll('.reply-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const commentId = event.target.dataset.commentId;
      const commentForm = document.querySelector('#commentForm');
      commentForm.querySelector('input[name="replyToId"]').value = commentId;
      commentForm.querySelector('textarea[name="commentBody"]').focus();
    });
  });
}

/**
 * Sets up event listeners for delete comment buttons.
 *
 * @function setupDeleteCommentListeners
 * @param {string} postId - The ID of the post the comments belong to.
 */
function setupDeleteCommentListeners(postId) {
  document.querySelectorAll('.delete-comment-button').forEach(button => {
    button.addEventListener('click', async (event) => {
      const commentId = event.target.dataset.commentId;
      if (confirm('Are you sure you want to delete this comment?')) {
        try {
          await deleteComment(postId, commentId);
          await refreshComments(postId);
        } catch (error) {
          console.error('Error deleting comment:', error);
          alert('Failed to delete comment. Please try again.');
        }
      }
    });
  });
}

/**
 * Deletes a comment from a post.
 *
 * @async
 * @function deleteComment
 * @param {string} postId - The ID of the post the comment belongs to.
 * @param {string} commentId - The ID of the comment to delete.
 * @returns {Promise<Object>} The response from the server.
 * @throws {Error} If the API request fails.
 */
async function deleteComment(postId, commentId) {
  const response = await fetch(`${API_BASE}/social/posts/${postId}/comment/${commentId}`, {
    method: 'DELETE',
    headers: headers()
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Check if the response has content before parsing JSON
  const text = await response.text();
  return text ? JSON.parse(text) : { message: 'Comment deleted successfully' };
}