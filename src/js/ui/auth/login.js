import { login } from "../../api/auth/login";

export async function onLogin(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.elements['email'].value;
    const password = form.elements['password'].value;

    try {
        const result = await login({ email, password });
        alert('Login successful');
        window.location.href = "../../";
        // Handle successful login (e.g., redirect, store token, etc.)
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
}