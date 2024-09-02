import NoroffAPI from "./api/index.js";
import { onRegister } from "./ui/auth/register.js";
import { onLogin } from "./ui/auth/login.js";
import { onLogout } from "./ui/auth/logout.js";
import { onCreatePost } from "./ui/post/create.js";

const api = new NoroffAPI("https://v2.api.noroff.dev")


switch (window.location.pathname){
    case "/":
    case "/index.html":
        console.log("click is enable")
        const logoutButton = document.getElementById("logoutButton");
        logoutButton.addEventListener("click", onLogout(api));
        break;
    case "/auth/register.html":
        document.forms.register.addEventListener("submit", onRegister);
        break;
    case "/auth/login.html":
        document.forms.login.addEventListener("submit", onLogin);
        break;
    case "/post/create/index.html":
        break;
    default:
}