import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

export async function createPost({ title, body, tags, media }) {
    try {
        const response = await fetch(API_SOCIAL_POSTS, {
            method: "POST",
            headers: {
                ...headers(),
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ title, body, tags, media }),
        });
        return await response.json();
    } catch (error) {
        console.error("API error:", error);
        return { success: false, error: error.message };
    }
}
