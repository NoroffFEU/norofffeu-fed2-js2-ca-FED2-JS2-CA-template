import { readPost } from "../../api/post/read.js";
import { getLoggedInUser } from "../../utilities/getLoggedInUser.js";

export async function onReadPost() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const postIdString = urlParams.get("id");
        const fetchPost = await readPost(postIdString);
        document.getElementById("content").textContent = fetchPost.body;
        document.getElementById("title").textContent = fetchPost.title;

        const loggedInUser = getLoggedInUser();

        if (loggedInUser && loggedInUser.email === fetchPost.author.email) {
            const editButton = document.getElementById("edit-post-btn");
            editButton.href = `/post/edit/?id=${fetchPost.id}`;
            editButton.style.display = "block";
        }

    } catch (error) {
        console.error("Failed to fill post:", error);
        document.getElementById("title").textContent = "Failed to load title";
        document.getElementById("content").textContent = "Failed to load content";
        alert(error.message);
    }
}
