// src/js/index.js

import NoroffAPI from '/src/js/api/index.js';
import NoroffApp from '/src/js/ui/index.js';
import { onLogout } from '/src/js/ui/global/logout.js'; 

// Initialize NoroffAPI and NoroffApp classes and set up API instance and app instance

const api = new NoroffAPI();
const app = new NoroffApp();


// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose
export default async function router(pathname = window.location.pathname) {
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
  
  document.addEventListener("DOMContentLoaded", () => {
    attachLogoutButton(); // Call the function initially
  });
  
  function attachLogoutButton() {
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
      logoutButton.addEventListener("click", onLogout);
      
    } else {
      console.error("Logout button not found in the DOM");
    }
  }

// Initialize the router
document.addEventListener("DOMContentLoaded", () => {
  router();
});

}
