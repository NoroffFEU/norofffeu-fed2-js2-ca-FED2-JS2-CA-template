import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers";

export async function fetchPostById(id) {
    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
            headers: headers(),
            method: "GET",
        });
        
        if (response.ok) {
            const data = await response.json();
            return data;
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

const urlParams = new URLSearchParams
const postIdString = urlParams.get("id");

export async function displayPost() {

    try {
        const fetchPost = await fetchPostById(postIdString);
        document.getElementById("content").textContent = fetchPost.body;
        document.getElementById("title").textContent = fetchPost.title;

    } catch (error) {
        console.error("Failed to fill post:", error);
        document.getElementById("title").textContent = "Failed to load title";
        document.getElementById("content").textContent = "Failed to load content";
        alert(error.message);
    }

    if (!postId) {
        console.log("No post ID found in URL");
    }
}

window.addEventListener("DOMContentLoaded", displayPost);