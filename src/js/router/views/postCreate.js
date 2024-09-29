import { onCreatePost } from "../../ui/post/create.js";

/**
 * Sets up and renders the create post view of the application.
 * 
 * This function initializes the create post page by calling the onCreatePost function.
 * 
 * @function postCreateView
 * @returns {void}
 * 
 * @example
 * // Call this function when the create post page loads
 * postCreateView();
 */

export default function postCreateView() {
  const form = document.querySelector('form[name="createPost"]');
  if (form) {
    form.addEventListener('submit', onCreatePost);
  } else {
    console.error("Create post form not found");
  }
}