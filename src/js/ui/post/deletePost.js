import api from '../../api/instance.js';
import { currentPostId } from "../../utilities/currentPostId.js";

export async function onDeletePost() {
    const id = currentPostId();
    
    try {
        await api.post.delete(id);
        window.location.href = "/";
    }   catch (e) {
        console.log(e);
        alert("Failed to delete post");
    }
}
