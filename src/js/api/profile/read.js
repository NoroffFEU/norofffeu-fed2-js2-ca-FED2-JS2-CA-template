import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

export async function readProfile(name) {
    try {
        const response = await fetch(`${API_SOCIAL_PROFILES}/${name}?_following=true&_followers=true&_posts=true`, {
            headers: headers()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }

        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error("Error reading profile:", error);
        throw error;
    }
}