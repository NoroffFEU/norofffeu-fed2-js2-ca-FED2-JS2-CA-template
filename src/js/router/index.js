  
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
                const { default: displayPosts } = await import("../ui/post/list.js");
                displayPosts();
              } catch (error) {
                console.error("Error loading post view:", error);
              }
              break;
              case "/post/edit/":
              case "/post/edit/index.html":
                console.log("Attempting to load post edit view");
                try {
                  const { default: postEditView } = await import("../ui/post/update.js");
                  postEditView();
                } catch (error) {
                  console.error("Error loading post edit view:", error);
                }
                break;
      case "/post/create/":
        case "/post/create/index.html":
          console.log("Attempting to load create post view");
          try {
            const { default: createPostView } = await import("../ui/post/create.js");
            createPostView();
          } catch (error) {
            console.error("Error loading create post view:", error);
          }
          break;
    case "/profile/":
      try {
        const { default: profileView } = await import("../api/profile/read.js");
        profileView();
      } catch (error) {
        console.error("Error loading profile view:", error);
      }
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