import { deletePost } from "../../api/post/delete.js";
import { readPost } from "../../api/post/read.js";
import { getLoggedInUser } from "../../utilities/getLoggedInUser.js";


export async function onDeletePost() {
    console.log("Delete post button clicked");
    
    const urlParams = new URLSearchParams(window.location.search);
    const postIdString = urlParams.get("id");
    const postId = parseInt(postIdString);
    const fetchPost = await readPost(postIdString);
    const deleteButton = document.getElementById("delete-post-btn");

    const loggedInUser = getLoggedInUser();
    if (loggedInUser && loggedInUser.email === fetchPost.author.email) {
        deleteButton.href = `/post/?id=${fetchPost.id}`;
        deleteButton.style.display = "block";
    }
    
    deleteButton.addEventListener("onclick", onDeletePost);
    try {
        const response = await deletePost(postId);
        console.log(response);
        window.location.href = "/";
    } catch (error) {
        console.error("An error occurred during post deletion:", error);
        alert(error.message);
    }
};
