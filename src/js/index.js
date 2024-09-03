import NoroffAPI from "./api/index.js";
import { onRegister } from "./ui/auth/register.js";
import { onLogin } from "./ui/auth/login.js";


const api = new NoroffAPI("https://v2.api.noroff.dev")

const userTest = {
    name:"natnoppol",
    email:"natnoppol@stud.noroff.no",
    password: "123456789"
}

await api.auth.register(userTest);

await api.auth.login({email:userTest.email, password:userTest.password, })

await api.post.read(post.id)

alert("test finished")



switch (window.location.pathname){
    case "/":
    case "/index.html":
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