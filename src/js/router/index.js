  
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
      const { default: authView } = await import("../ui/auth/index.js");
      authView();
      break;
      case "/auth/login/":
        try {
          const { default: setupLoginForm } = await import("../ui/auth/login.js");
          setupLoginForm();
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
      const { default: postView } = await import("../ui/post/index.js");
      postView();
      break;
    case "/post/edit/":
      const { default: postEditView } = await import("../ui/post/edit.js");
      postEditView();
      break;
    case "/post/create/":
        try {
          const postCreateModule = await import("../ui/post/create.js");
          postCreateModule.default();
        } catch (error) {
          console.error("Error loading create post view:", error);
        }
        break;
    case "/profile/":
      const { default: profileView } = await import("../ui/profile/index.js");
      profileView();
      break;
    default:
      try {
        const { default: notFoundView } = await import("../ui/notFound.js");
        notFoundView();
      } catch (error) {
        console.error("Error loading not found view:", error);
        document.querySelector('main').innerHTML = '<h1>404 - Page Not Found</h1>';
      }
  }
}