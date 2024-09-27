// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose
export default async function router(pathname = window.location.pathname) {
  let module;
  switch (pathname) {
    case "/":
      module = await import("./views/home.js");
      break;
    case "/auth/":
      module = await import("./views/auth.js");
      break;
    case "/auth/login/":
      module = await import("./views/login.js");
      break;
    case "/auth/register/":
      module = await import("./views/register.js");
      break;
    case "/post/":
      module = await import("./views/post.js");
      break;
    case "/post/edit/":
      module = await import("./views/postEdit.js");
      break;
    case "/post/create/":
      module = await import("./views/postCreate.js");
      break;
    case "/profile/":
      module = await import("./views/profile.js");
      break;
    default:
      module = await import("./views/notFound.js");
  }
  
  if (module.default) {
    module.default();
  }
}
