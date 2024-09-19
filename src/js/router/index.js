// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose
export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      try {
        const { default: homeView } = await import("./views/home.js");
        homeView();
      } catch (error) {
        console.error("Error loading home view:", error);
      }
      break;
    case "/auth/":
      const { default: authView } = await import("./views/auth.js");
      authView();
      break;
    case "/auth/login/":
      const { default: loginView } = await import("./views/login.js");
      loginView();
      break;
    case "/auth/register/":
      const { default: registerView } = await import("./views/register.js");
      registerView();
      break;
    case "/post/":
      const { default: postView } = await import("./views/post.js");
      postView();
      break;
    case "/post/edit/":
      const { default: postEditView } = await import("./views/postEdit.js");
      postEditView();
      break;
    case "/post/create/":
      const { default: postCreateView } = await import("./views/postCreate.js");
      postCreateView();
      break;
    case "/profile/":
      const { default: profileView } = await import("./views/profile.js");
      profileView();
      break;
    default:
      const { default: notFoundView } = await import("./views/notFound.js");
      notFoundView();
  }
}