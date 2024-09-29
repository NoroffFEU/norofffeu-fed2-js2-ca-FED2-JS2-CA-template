import { API_SOCIAL_POSTS, API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";

// Gets specific post from API by ID.
export async function readPost(id) {
    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${id}?_author=true`, {
            headers: headers(),
            method: "GET",
        });
        
        if (response.ok) {
            const responseBody = await response.json();
            return responseBody.data;
        } else {
            const errorData = await response.json(); // Handle error response from API
            throw new Error(errorData.message || "Uh oh, something went wrong");
        }
    }
    catch (error) {
        console.error("An error occurred during fetching posting:", error);
        throw error;
    }
}

// Gets the 12 latest posts from API by ID.
export async function readPosts(limit = 12, page = 1, tag) {
    try {
        const response = await fetch(`${API_SOCIAL_POSTS}?limit=${limit}&page=${page}`, {
            headers: headers(),
            method: "GET",
        });
        
        if (response.ok) {
            const responseBody = await response.json();
            return responseBody.data;
        } else {
            const errorData = await response.json(); // Handle error response from API
            throw new Error(errorData.message || "Uh oh, something went wrong");
        }
    }
    catch (error) {
        console.error("An error occurred during fetching posting:", error);
        throw error;
    }
}

// Gets posts by user from API. In this case used for "My Posts" page.
export async function readPostsByUser(username, limit = 12, page = 1, tag) {
    try {
        const response = await fetch(`${API_SOCIAL_PROFILES}/${username}/posts/?limit=${limit}&page=${page}`, {
            headers: headers(),
            method: "GET",
        });
        
        if (response.ok) {
            const responseBody = await response.json();
            return responseBody.data;
        } else {
            const errorData = await response.json(); // Handle error response from API
            throw new Error(errorData.message || "Uh oh, something went wrong");
        }
    }
    catch (error) {
        console.error("An error occurred during fetching posting:", error);
        throw error;
    }
}
