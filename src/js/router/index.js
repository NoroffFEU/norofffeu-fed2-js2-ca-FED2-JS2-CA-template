  
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
      try {
        const { default: postView } = await import("../ui/post/index.js");
        postView();
      } catch (error) {
        console.error("Error loading post view:", error);
      }
      break;
    case "/post/edit/":
      try {
        const { default: postEditView } = await import("../ui/post/edit.js");
        postEditView();
      } catch (error) {
        console.error("Error loading post edit view:", error);
      }
      break;
    case "/post/create/":
      try {
        const { default: postCreateView } = await import("../ui/post/create.js");
        postCreateView();
      } catch (error) {
        console.error("Error loading create post view:", error);
      }
      break;
    case "/profile/":
      try {
        const { default: profileView } = await import("../ui/profile/index.js");
        profileView();
      } catch (error) {
        console.error("Error loading profile view:", error);
      }
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