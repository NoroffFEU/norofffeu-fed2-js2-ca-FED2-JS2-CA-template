import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from "../../ui/global/logout";
import { readPosts } from "../../api/post/read"; // Adjust based on your file structure

authGuard();
setLogoutListener();

const postContainer = document.getElementById("postContainer");

let currentPage = 1;

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

        card.innerHTML = `
                <div class="media">
                <img src="${
                    post.media?.url ||
                    "https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg"
                }" alt="${post.media?.alt || "Post Image"}">
            </div>
            <h2 class="title">${post.title}</h2>
            <p class="tags">${post.tags.join(", ")}</p>
            <p class="body">${post.body}</p>
        `;

        card.addEventListener("click", () => {
            localStorage.setItem("selectedPostId", post.id);
            window.location.href = "/post/";
        });

        postContainer.appendChild(card);
    });
    globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

nextBtn.addEventListener("click", () => {
    currentPage++;
    displayPosts(currentPage);
});

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayPosts(currentPage);
    }
});

displayPosts(currentPage);
