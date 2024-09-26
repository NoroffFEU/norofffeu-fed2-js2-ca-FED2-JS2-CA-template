import { API_KEY, API_SOCIAL_PROFILES } from "../constants.js";

export async function readProfile(userID) {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${userID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            "X-Noroff-API-Key": API_KEY,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch profile data.");
    }
    return await response.json();
}