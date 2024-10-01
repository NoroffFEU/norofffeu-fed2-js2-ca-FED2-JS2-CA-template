import { API_SOCIAL_POSTS, API_KEY } from "../constants";
import { getKey } from "../auth/key";

export async function readPost(id) {
    const accessToken = await getKey();
    if (!accessToken) {
        console.error("No access token. Cannot fetch post.");
        return;
    }

    const myHeaders = new Headers();
    myHeaders.append("X-Noroff-API-Key", API_KEY);
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const response = await fetch(
            `${API_SOCIAL_POSTS}/${id}?_author=true`,
            requestOptions
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch post: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error;
    }
}

// multiple posts
export async function readPosts(limit = 12, page = 1, tag) {
    const accessToken = await getKey();

    if (!accessToken) {
        console.error("No accessToken. Cannot fetch posts.");
        return { ok: false, error: "No access token" };
    }

    const url = new URL(API_SOCIAL_POSTS);
    url.searchParams.append("limit", limit);
    url.searchParams.append("page", page);
    if (tag) {
        url.searchParams.append("tag", tag);
    }

    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": API_KEY,
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await fetch(url.toString(), options);
        const data = await response.json();
        if (response.ok) {
            return { ok: true, data };
        }
        throw new Error("Failed to fetch posts");
    } catch (error) {
        console.error("Error fetching posts:", error);
        return { ok: false, error: error.message };
    }
}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {}
