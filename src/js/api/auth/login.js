import {API_AUTH_LOGIN } from "../constants";
import { headers } from "../headers"

/**
 * Logs in a user by sending their credentials to the server.
 * 
 * This function sends a POST request to the login API endpoint with the user's email and password.
 * If login is successful, it stores the access token in localStorage, redirects the user to the homepage, and displays a success message.
 * If an error occurs, it logs the error and shows an alert with the error message.
 *
 * @async
 * @function login
 * @param {Object} params - The login credentials.
 * @param {string} params.email - The user's email address.
 * @param {string} params.password - The user's password.
 * @returns {Promise<void>} Resolves when the function completes.
 */

const loginButton = document.getElementById("login-button")
loginButton.addEventListener("click", handleLoginClick)

function handleLoginClick() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
        login({ email, password });
    } else {
        alert("Please enter both email and password.");
    }
}

export async function login({ email, password }) {
    const body = {
        email: email,
        password: password
    }
    try {
        const response = await fetch(API_AUTH_LOGIN, {
            method: "POST",
            headers: headers(),
            body: JSON.stringify(body),
        });
        
        if (response.ok) {
            const data = await response.json();
            const accessToken = data.data.accessToken;
            localStorage.setItem("token", accessToken);
            window.location.href = "/"
            alert(`Successfully logged in`);
            
        } 
    } catch (error) {
        console.error("Error during login:", error);
        alert(`An error occurred: ${error.message}`);
    }
}

