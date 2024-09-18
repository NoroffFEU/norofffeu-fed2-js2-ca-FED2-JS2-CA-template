import "./css/style.css";
import router from "./js/router";
import { setupRegisterForm } from './js/ui/auth/register.js';

async function init() {
  await router(window.location.pathname);
  console.log('Router finished, setting up register form'); // Debugging line
  setupRegisterForm();
}

init();