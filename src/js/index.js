// src/js/index.js

import NoroffAPI from '/src/js/api/index.js';
import NoroffApp from '/src/js/ui/index.js';
import { onLogout } from '/src/js/ui/global/logout.js'; // Ensure correct import path

const api = new NoroffAPI();
const app = new NoroffApp();

// This function controls which JavaScript file is loaded on which page
export default async function router(pathname = window.location.pathname) {
  try {
    switch (pathname) {
      case "/":
        await import("/src/js/router/views/home.js");
        break;
      case "/auth/index.html":
        await import("/src/js/router/views/auth.js");
        break;
      case "/auth/login/index.html":
        await import("/src/js/router/views/login.js");
        break;
      case "/auth/register/index.html":
        await import("/src/js/router/views/register.js");
        break;
      case "/post/index.html":
        await import("/src/js/router/views/post.js");
        break;
      case "/post/edit/index.html":
        await import("/src/js/router/views/postEdit.js");
        break;
      case "/post/create/index.html":
        await import("/src/js/router/views/postCreate.js");
        break;
      case "/profile/index.html":
        await import("/src/js/router/views/profile.js");
        break;
      default:
        await import("/src/js/router/views/notFound.js");
        break;
    }

    // Attach the logout button listener after content is fully loaded
    document.addEventListener("DOMContentLoaded", () => {
      attachLogoutButton();
    });
  } catch (error) {
    console.error("Error loading the route:", error);
  }
}

// Function to attach logout event listener
function attachLogoutButton() {
  try {
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
      logoutButton.addEventListener("click", onLogout);
      console.log("Logout button event listener attached");
    } else {
      console.error("Logout button not found in the DOM");
    }
  } catch (error) {
    console.error("Failed to attach logout button event:", error);
  }
}

// Initialize the router once the DOM is ready
document.addEventListener("DOMContentLoaded", () => router());
