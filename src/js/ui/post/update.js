import { updatePost as apiUpdatePost } from "../../api/post/update.js";
import { readPost } from "../../api/post/read.js";

/**
 * Sets up and handles the post edit view.
 * Fetches the post data, populates the form, and handles form submission.
 * 
 * @async
 * @function postEditView
 * @returns {Promise<void>}
 */

export default async function postEditView() {
  console.log("Edit post view loaded");
  
  const form = document.querySelector('form[name="editPost"]');
  if (!form) {
    console.error("Edit post form not found");
    return;
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  console.log("Post ID to edit:", postId);
  
  if (!postId) {
    console.error("No post ID provided");
    return;
  }
  
  try {
    const response = await readPost(postId);
    console.log("Raw API response:", response);
    
    // Extract the post data, assuming it's nested under a 'data' property
    const postData = response.data || response;
    console.log("Extracted post data:", postData);
    
    populateForm(form, postData);
  } catch (error) {
    console.error("Error fetching post:", error);
    // Show error message to user
    return;
  }
  
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(form);
    const updatedPostData = {
      title: formData.get('title'),
      body: formData.get('body'),
      tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()).filter(Boolean) : [],
      media: formData.get('media') ? { url: formData.get('media').trim() } : null
    };
    
    console.log("Submitting updated post data:", updatedPostData);
    
    try {
        const updatedPost = await apiUpdatePost(postId, updatedPostData);
        console.log("Post updated successfully:", updatedPost);
        
        window.location.href = `/post/?id=${postId}`;
    } catch (error) {
        console.error("Error updating post:", error);
        alert('Failed to update post. Please try again.');
    }
});
}

/**
 * Populates the edit form with the post data.
 * 
 * @function populateForm
 * @param {HTMLFormElement} form - The form to populate
 * @param {Object} postData - The post data to populate the form with
 */

function populateForm(form, postData) {
  console.log("Raw post data received:", postData);

  let title, body, tags, media;

  if (postData && typeof postData === 'object') {
    if (postData.data) {
      // If the post data is nested under a 'data' property
      ({ title, body, tags, media } = postData.data);
    } else {
      // If the post data is directly in the object
      ({ title, body, tags, media } = postData);
    }

    form.title.value = title || '';
    form.body.value = body || '';
    form.tags.value = Array.isArray(tags) ? tags.join(', ') : (tags || '');
    form.media.value = media?.url || media || '';
  } else {
    console.error("Invalid post data received:", postData);
  }
}
