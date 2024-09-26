import { readPost } from "../../api/post/read";

async function initialize() {
    const selectedPostId = localStorage.getItem("selectedPostId");
    console.log("Selected Post ID:", selectedPostId);

    if (!selectedPostId) {
        console.error("No post ID found.");
        return;
    }

    try {
        const post = await readPost(selectedPostId);
        const user = localStorage.getItem("userID");
        console.log("Fetched Post:", post);

        if (post) {
            const postContainer = document.getElementById("postContainer");

            postContainer.innerHTML += `
                <div class="media">
                <img src="${
                    post.data.media?.url ||
                    "https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg"
                }" alt="${post.data.media?.alt || "post image"}" />
                </div>
                <h2 class="title">${post.data.title}</h2>
                ${
                    post.data.tags
                        ? post.data.tags
                              .map((tag) => `<span class="tag">${tag}</span>`)
                              .join(" ")
                        : ""
                }
                <p class="body">${post.data.body}</p>
                <p class="created">${post.data.created}</p>
                `;
            if (post.data.author.name === user) {
                const editBtn = document.createElement("button");
                const btnContent = document.createTextNode("Edit Post");
                editBtn.addEventListener("click", () => {
                    window.location.href = "/post/edit/";
                });
                editBtn.append(btnContent);
                postContainer.append(editBtn);
            }
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
