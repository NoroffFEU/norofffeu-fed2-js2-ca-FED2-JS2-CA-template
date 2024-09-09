import { register } from "./js/api/auth/register";
import { onRegister } from "./js/ui/auth/register";

import router from "./js/router";

await router(window.location.pathname);
