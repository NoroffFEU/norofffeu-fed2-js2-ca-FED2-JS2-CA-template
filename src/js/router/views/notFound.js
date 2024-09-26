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