/**
 * Renders the 404 Not Found view.
 * 
 * This function updates the main content of the page with a 404 error message
 * when a user tries to access a non-existent page.
 * 
 * @function notFoundView
 * @returns {void}
 * 
 * @example
 * // Call this function when a page is not found
 * notFoundView();
 */

export default function notFoundView() {
  console.log("NotFound view function called");
  const main = document.querySelector('main');
  if (main) {
    main.innerHTML = `
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    `;
  } else {
    console.error("Main element not found in notFoundView");
  }
}