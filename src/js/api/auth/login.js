import { API_AUTH_LOGIN, API_KEY } from "../constants.js";

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
