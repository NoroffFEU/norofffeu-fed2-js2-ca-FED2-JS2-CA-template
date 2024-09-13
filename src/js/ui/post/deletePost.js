import { deletePost } from "../../api/post/delete.js";
import { currentPostId } from "../../utilities/currentPostId.js";

export async function onDeletePost() {
    const id = currentPostId();
    
    try {
        await deletePost(id);
        window.location.href = "/";
    }   catch (e) {
        console.log(e);
        alert("Failed to delete post");
    }
}
