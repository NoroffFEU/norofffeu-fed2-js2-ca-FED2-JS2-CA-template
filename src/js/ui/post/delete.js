import { deletePost } from "../../api/post/delete.js";

export async function onDeletePost() {
    console.log("Delete post button clicked");
    
    const urlParams = new URLSearchParams(window.location.search);
    const postIdString = urlParams.get("id");
    const postId = parseInt(postIdString);
    
    try {
        const response = await deletePost(postId);
        if (response) {
            alert("Post deleted successfully");
        }
        window.location.href = "/";
    } catch (error) {
        console.error("An error occurred during post deletion:", error);
        alert(error.message);
    }
};
