import { updatePost } from "../../api/post/update.js";
import { fetchPostById } from "../../api/post/getPost.js";

const postId = new URLSearchParams(window.location.search).get("id");

export async function onUpdatePost(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    
    const postData = {
        title: title,
        content: content,
    };
    
    try {
        const response = await updatePost(postId, postData);
        console.log(response);
        window.location.href = "/post/?id=" + response.id;
    } catch (error) {
        console.error("An error occurred during post update:", error);
        alert(error.message);
    }
}
