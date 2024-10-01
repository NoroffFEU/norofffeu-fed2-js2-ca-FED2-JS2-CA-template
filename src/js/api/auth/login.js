import { API_AUTH_LOGIN, API_KEY } from "../constants.js";

/**
 * Logs in a user with the provided email and password.
 *
 * @param {Object} credentials - The login credentials.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the login result.
 *                              - If successful, the object has the structure: { ok: true, data: <user data> }
 *                              - If unsuccessful, the object has the structure: { ok: false, error: <error message> }
 */
export async function login({ email, password }) {
    try {
        const response = await fetch(API_AUTH_LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY,
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            return { ok: true, data };
        }

        throw new Error("Failed to login: email or password is incorrect");
    } catch (error) {
        console.error(error);
        return { ok: false, error: error.message };
    }
}
