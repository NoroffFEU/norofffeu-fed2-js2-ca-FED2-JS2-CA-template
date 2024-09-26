import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from "../../ui/global/logout";
import { readPosts } from "../../api/post/read"; // Adjust based on your file structure

authGuard();
setLogoutListener();

const postContainer = document.getElementById("postContainer");

async function displayPosts(page = 1) {
    const { ok, data } = await readPosts(12, page);

    if (!ok) {
        alert("Failed to load posts");
        return;
    }

    postContainer.innerHTML = "";

    data.data.forEach((post) => {
        const card = document.createElement("div");
        card.classList.add("postCard");

        const mediaUrl =
            post.media?.url ||
            "https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg";
        const mediaAlt = post.media?.alt || "Post Image";

        const tags = post.tags?.length
            ? `<p class="tags">${post.tags.join(", ")}</p>`
            : "";

        card.innerHTML = `
            <div class="media">
                <img src="${mediaUrl}" alt="${mediaAlt}" />
            </div>
            <h2 class="title">${post.title}</h2>
            ${tags}
            <p class="body">${post.body}</p>
        `;

        card.addEventListener("click", () => {
            localStorage.setItem("selectedPostId", post.id);
            window.location.href = "/post/";
        });

        postContainer.appendChild(card);
    });
}

// Call the function to display posts when the page loads
displayPosts();
