import { API_BASE } from "../../api/constants.js";
import { headers } from "../../api/headers.js";

export function setupCommentFunctionality(postId) {
  const commentForm = document.querySelector('#commentForm');
  const commentsList = document.querySelector('#commentsList');
  
  if (commentForm) {
    commentForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const submitButton = commentForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      
      const commentBody = commentForm.querySelector('textarea[name="commentBody"]').value;
      const replyToId = commentForm.querySelector('input[name="replyToId"]').value;

      try {
        await addComment(postId, commentBody, replyToId);
        commentForm.reset();
        commentForm.querySelector('input[name="replyToId"]').value = 'null';
        await refreshComments(postId);
      } catch (error) {
        console.error('Error adding comment:', error);
        alert('Failed to add comment. Please try again.');
      } finally {
        submitButton.disabled = false;
      }
    });
  }

  refreshComments(postId);
}

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

function displayComments(comments, postId) {
  const commentsList = document.querySelector('#commentsList');
  if (!commentsList) return;

  commentsList.innerHTML = ''; // Clear previous comments

  comments.forEach(comment => {
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.innerHTML = `
      <p>${comment.body}</p>
      <small>By: ${comment.owner} on ${new Date(comment.created).toLocaleString()}</small>
      <button class="reply-button" data-comment-id="${comment.id}">Reply</button>
      <button class="delete-comment-button" data-comment-id="${comment.id}">Delete</button>
    `;

    if (comment.replies && comment.replies.length > 0) {
      const replyContainer = document.createElement('div');
      replyContainer.className = 'replies';
      comment.replies.forEach(reply => {
        const replyElement = document.createElement('div');
        replyElement.className = 'reply';
        replyElement.innerHTML = `
          <p>${reply.body}</p>
          <small>By: ${reply.owner} on ${new Date(reply.created).toLocaleString()}</small>
          <button class="delete-comment-button" data-comment-id="${reply.id}">Delete</button>
        `;
        replyContainer.appendChild(replyElement);
      });
      commentElement.appendChild(replyContainer);
    }

    commentsList.appendChild(commentElement);
  });

  setupReplyButtonListeners();
  setupDeleteCommentListeners(postId);
}

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