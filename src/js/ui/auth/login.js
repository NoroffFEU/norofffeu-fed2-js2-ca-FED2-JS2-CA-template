import { login } from "../../api/auth/login.js";

export async function onLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await login({ email, password });

    if (response.ok) {
        const { accessToken, name } = response.data.data;

        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("userID", name);
            window.location.href = "/";
        }
    } else {
        alert("Login failed: " + response.error);
    }
}
