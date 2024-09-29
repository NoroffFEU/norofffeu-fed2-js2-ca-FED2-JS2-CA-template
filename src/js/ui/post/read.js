import { onDeletePost } from "../../ui/post/delete.js";
import { getLoggedInUser } from "../../utilities/getLoggedInUser.js";

export async function onReadPost(post) {
    document.getElementById("content").textContent = post.body;
    document.getElementById("title").textContent = post.title;

    const loggedInUser = getLoggedInUser();

    if (loggedInUser && loggedInUser.email === post.author.email) {
        const editButton = document.getElementById("edit-post-btn");
        editButton.href = `/post/edit/?id=${post.id}`;
        editButton.classList.remove("hidden");
        
        const deleteButton = document.getElementById("delete-post-btn");
        deleteButton.addEventListener("click", onDeletePost);
        deleteButton.classList.remove("hidden");
    }
}
