import { API_SOCIAL_POSTS, API_SOCIAL_PROFILES, API_KEY } from "../constants";
// import { getKey } from "../auth/key";
// getKey();

const accessToken = localStorage.getItem("accessToken");

export async function readPost(id) {
    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": API_KEY,
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, options);
        const data = await response.json();
        if (response.ok) {
            return { ok: true, data };
        }
        throw new Error("Failed to fetch post");
    } catch (error) {
        console.error(error);
        return { ok: false, error: error.message };
    }
}
export async function readPosts(limit = 12, page = 1, tag) {
    const url = new URL(API_SOCIAL_POSTS);
    url.searchParams.append("limit", limit);
    url.searchParams.append("page", page);
    if (tag) {
        url.searchParams.append("tag", tag);
    }

    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`, // Bearer token for auth
            "X-Noroff-API-Key": API_KEY,
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(url.toString(), options); // Fetch posts
        const data = await response.json();
        if (response.ok) {
            return { ok: true, data };
        }
        throw new Error("Failed to fetch posts");
    } catch (error) {
        console.error(error);
        return { ok: false, error: error.message };
    }
}
export async function readPostsByUser(username, limit = 12, page = 1, tag) {}
