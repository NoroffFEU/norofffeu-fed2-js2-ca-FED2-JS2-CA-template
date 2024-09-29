import { profileView } from "../router/views/profile.js";

/**
 * A function to handle routing based on the current pathname.
 * Dynamically imports views based on the current URL path and executes the corresponding view logic.
 * 
 * @async
 * @function router
 * @param {string} [pathname=window.location.pathname] - The current URL path (optional, defaults to window's location pathname).
 * @returns {Promise<void>}
 */
export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
    case "/index.html":
      console.log("Attempting to load home view");
      try {
        const { default: homeView } = await import("./views/home.js");
        homeView();
      } catch (error) {
        console.error("Error loading home view:", error);
      }
      break;

    case "/auth/":
      try {
        const { default: authView } = await import("./views/auth.js");
        authView();
      } catch (error) {
        console.error("Error loading auth view:", error);
      }
      break;

    case "/auth/login/":
    case "/auth/login/index.html":
      console.log("Attempting to load login view");
      try {
        const { default: loginView } = await import("../ui/auth/login.js");
        loginView();
      } catch (error) {
        console.error("Error loading login view:", error);
      }
      break;

    case "/auth/register/":
      try {
        const { default: setupRegisterForm } = await import("../ui/auth/register.js");
        setupRegisterForm();
      } catch (error) {
        console.error("Error loading register view:", error);
      }
      break;

    case "/post/":
      try {
        const postId = new URLSearchParams(window.location.search).get('id');
        if (postId) {
          // Single post view
          const { displaySinglePost } = await import("../ui/post/list.js");
          await displaySinglePost(postId);
        } else {
          // Post list view
          const { displayPosts } = await import("../ui/post/list.js");
          await displayPosts();
        }
      } catch (error) {
        console.error("Error loading post view:", error);
      }
      break;

    case "/post/edit/":
    case "/post/edit/index.html":
      console.log("Attempting to load post edit view");
      try {
        const { default: postEditView } = await import("../ui/post/update.js");
        await postEditView();
      } catch (error) {
        console.error("Error loading post edit view:", error);
      }
      break;

    case "/post/create/":
    case "/post/create/index.html":
      console.log("Attempting to load create post view");
      try {
        const { setupCreatePostFunctionality } = await import("../ui/post/create.js");
        setupCreatePostFunctionality();
      } catch (error) {
        console.error("Error loading create post view:", error);
      }
      break;

    case "/profile/":
    case "/profile/index.html":
      console.log("Loading profile view");
      profileView();
      break;

    default:
      console.log("Attempting to load not found view");
      try {
        const { default: notFoundView } = await import("../router/views/notFound.js");
        notFoundView();
      } catch (error) {
        console.error("Error loading not found view:", error);
        const main = document.querySelector('main');
        if (main) {
          main.innerHTML = '<h1>404 - Page Not Found</h1>';
        } else {
          console.error("Main element not found");
        }
      }
  }
}
