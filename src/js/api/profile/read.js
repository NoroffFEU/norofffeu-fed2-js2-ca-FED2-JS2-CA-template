import { API_KEY, API_SOCIAL_PROFILES } from "../constants.js";

export async function readProfile() {
    const name = localStorage.getItem("userID");

    try {
        const response = await fetch(`${API_SOCIAL_PROFILES}/${name}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "X-Noroff-API-Key": API_KEY,
            },
        });

        if (!response.ok) {
            console.error(response.status, response.statusText);
            throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();

        return { ok: true, data };
    } catch (error) {
        console.error("Error occurred while fetching data:", error);
        return { ok: false, error: error.message };
    }
}
