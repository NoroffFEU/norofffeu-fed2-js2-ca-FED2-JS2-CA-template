console.log('Login view script loaded');

import { onLogin } from '../../ui/auth/login.js';

export default function loginView() {
    console.log('Login view loaded');
    setupLoginForm();
}

function setupLoginForm() {
    console.log("Setting up login form");
    const form = document.querySelector('form[name="login"]');
    if (form) {
        console.log("Form found, attaching event listener");
        form.addEventListener("submit", onLogin);
    } else {
        console.error("Login form not found");
    }
}

loginView();