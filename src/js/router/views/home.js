import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from "../../ui/global/logout";
import { readPosts, readPost, readPostsByUser } from "../../api/post/read";

authGuard();
setLogoutListener();

const postContainer = document.getElementById("postContainer");

async function displayPosts(page = 1) {
    const { ok, data } = await readPosts(12, page);
    if (!ok) {
        postContainer.innerHTML = "<p>Failed to load posts.</p>";
        return;
    }

    postContainer.innerHTML = "";

    data.data.forEach((post) => {
        const card = document.createElement("div");
        card.classList.add("post-card");

        const mediaUrl =
            post.media?.url ||
            "https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg";
        const mediaAlt = post.media?.alt || "Post Image";

        card.innerHTML = `
            <div class="media">
                <img src="${mediaUrl}" alt="${mediaAlt}" />
            </div>
            <h2 class="title" data-post-id="${post.id}">${post.title}</h2>
            <p class="tags">${post.tags.join(", ")}</p>
            <p class="body">${post.body}</p>
        `;

        // Add event listener to post title to display single post
        card.querySelector(".title").addEventListener("click", () => {
            displaySinglePost(post.id);
        });

        postContainer.appendChild(card);
    });
}

// Function to handle single post view
async function displaySinglePost(postId) {
    const { ok, data } = await readPost(postId);

    if (!ok) {
        postContainer.innerHTML = "<p>Failed to load the post.</p>";
        return;
    }

    const post = data;
    postContainer.innerHTML = ""; // Clear content

    const singlePostCard = document.createElement("div");
    singlePostCard.classList.add("single-post-card");

    const mediaUrl = post.media?.url || "https://via.placeholder.com/300";
    const mediaAlt = post.media?.alt || "Post Image";

    singlePostCard.innerHTML = `
        <div class="media">
            <img src="${mediaUrl}" alt="${mediaAlt}" />
        </div>
        <h2 class="title">${post.title}</h2>
        <p class="tags">${post.tags.join(", ")}</p>
        <p class="body">${post.body}</p>
        <p class="author" data-username="${post.author.username}">Posted by: ${
        post.author.name
    }</p>
    `;

    // Add click event to author to display their posts
    singlePostCard.querySelector(".author").addEventListener("click", () => {
        displayPostsByUser(post.author.username);
    });

    postContainer.appendChild(singlePostCard);
}

// Function to display all posts by a user
async function displayPostsByUser(username) {
    const { ok, data } = await readPostsByUser(username);

    if (!ok) {
        postContainer.innerHTML = "<p>Failed to load posts by user.</p>";
        return;
    }

    postContainer.innerHTML = ""; // Clear content

    data.data.forEach((post) => {
        const card = document.createElement("div");
        card.classList.add("post-card");

        const mediaUrl = post.media?.url || "https://via.placeholder.com/300";
        const mediaAlt = post.media?.alt || "Post Image";

        card.innerHTML = `
            <div class="media">
                <img src="${mediaUrl}" alt="${mediaAlt}" />
            </div>
            <h2 class="title" data-post-id="${post.id}">${post.title}</h2>
            <p class="tags">${post.tags.join(", ")}</p>
            <p class="body">${post.body}</p>
            <p class="author" data-username="${
                post.author.username
            }">Posted by: ${post.author.name}</p>
        `;

        // Add event listener to post title to display single post
        card.querySelector(".title").addEventListener("click", () => {
            displaySinglePost(post.id);
        });

        postContainer.appendChild(card);
    });
}

displayPosts();
