import { readPost } from "../../api/post/read";

async function initialize() {
    console.log("DOM fully loaded and parsed");

    const selectedPostId = localStorage.getItem("selectedPostId");
    console.log("Selected Post ID:", selectedPostId);

    if (!selectedPostId) {
        console.error("No post ID found.");
        return;
    }

    try {
        const post = await readPost(selectedPostId);
        console.log("Fetched Post:", post);

        if (post) {
            const postContainer = document.getElementById("postContainer");

            // Define mediaUrl, mediaAlt, and tags
            const mediaUrl =
                post.data.media?.url ||
                "https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg"; // Replace with actual default URL
            const mediaAlt = post.data.media.alt || "post image";
            const tags = post.data.tags
                ? post.data.tags
                      .map((tag) => `<span class="tag">${tag}</span>`)
                      .join(" ")
                : "";

            postContainer.innerHTML += `
                <div class="media">
                    <img src="${mediaUrl}" alt="${mediaAlt}" />
                </div>
                <h2 class="title">${post.data.title}</h2>
                ${tags}
                <p class="body">${post.data.body}</p>
                <p class="created">${post.data.created}</p>
            `;
        } else {
            console.error("Post not found.");
        }
    } catch (error) {
        console.error("Error fetching post:", error);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
} else {
    initialize();
}
