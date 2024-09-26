import { API_KEY, API_SOCIAL_PROFILES } from "../constants.js";

export async function updateProfile(userID, { avatar, banner, bio }) {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${userID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify({ avatar: { url: avatar, alt: "User Avatar" }, banner: { url: banner, alt: "User Banner" }, bio }),
    });

    if (!response.ok) {
        throw new Error("Could not update profile.");
    }
    return await response.json();
}