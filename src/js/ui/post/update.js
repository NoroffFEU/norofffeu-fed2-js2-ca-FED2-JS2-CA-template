import { updatePost } from "../../api/post/update.js";
import { readPost } from "../../api/post/read.js";

export default async function postEditView() {
  console.log("Edit post view loaded");
  
  const form = document.querySelector('form[name="editPost"]');
  if (!form) {
    console.error("Edit post form not found");
    return;
  }

  const postId = new URLSearchParams(window.location.search).get('id');
  console.log("Post ID to edit:", postId);

  if (!postId) {
    console.error("No post ID provided");
    return;
  }

  try {
    const postData = await readPost(postId);
    console.log("Fetched post data:", postData);
    populateForm(form, postData.data);
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
      media: formData.get('media') ? { url: formData.get('media') } : null
    };

    console.log("Submitting updated post data:", updatedPostData);

    try {
      const updatedPost = await updatePost(postId, updatedPostData);
      console.log("Post updated successfully:", updatedPost);
      // Redirect to the post list or show a success message
      window.location.href = '/post/';
    } catch (error) {
      console.error("Error updating post:", error);
      // Show an error message to the user
    }
  });
}

function populateForm(form, post) {
  console.log("Populating form with post data:", post);
  
  if (post && typeof post === 'object') {
    form.title.value = post.title || '';
    form.body.value = post.body || '';
    form.tags.value = Array.isArray(post.tags) ? post.tags.join(', ') : '';
    form.media.value = post.media?.url || '';
  } else {
    console.error("Invalid post data received:", post);
  }
}