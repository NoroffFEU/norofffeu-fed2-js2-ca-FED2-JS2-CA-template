import { onDeletePost } from "../../ui/post/delete.js";
import { getLoggedInUser } from "../../utilities/getLoggedInUser.js";

// Gets the post and fills the content and title of the post.
// If user is author on post, edit and delete buttons are shown.
// Buttons are hidden by default as user does not have permission to edit or delete others posts.
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
