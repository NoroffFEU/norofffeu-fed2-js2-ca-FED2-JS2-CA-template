export default function notFoundView() {
    const main = document.querySelector('main');
    main.innerHTML = `
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    `;
  }
