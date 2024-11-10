import { onRegister } from "../../ui/auth/register";
import { setLogoutListener } from "../../ui/global/logout";

const form = document.forms.register;

form.addEventListener("submit", onRegister);

setLogoutListener()
