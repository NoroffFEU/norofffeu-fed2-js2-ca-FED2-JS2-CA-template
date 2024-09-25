import { currentPostId } from "../utilities/currentPostId.js";
import NoroffAPI from '../api/index.js';
import NoroffApp from '../ui/index.js';

// Initialize NoroffAPI and NoroffApp classes and set up API instance and app instance

const api = new NoroffAPI();
const app = new NoroffApp();

const postId = currentPostId();

document.querySelectorAll("[data-auth=logout]").forEach(button => {
  button.addEventListener("click", event => {
    api.auth.logout();
  });
});

// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose
export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    
    case "/":
      await import("./views/home.js");
      break;
    case "/auth/":
      await import("./views/auth.js");
      break;
    case "/auth/login/":
      await import("./views/login.js");
      break;
    case "/auth/register/":
      await import("./views/register.js");
      break;
    case "/post/":
      await import("./views/post.js");
      break;
    case "/post/edit/":
      await import("./views/postEdit.js");
      break;
    case "/post/create/":
      await import("./views/postCreate.js");
      break;
    case "/profile/":
      await import("./views/profile.js");
      break;
    default:
      await import("./views/notFound.js");
  }
}
