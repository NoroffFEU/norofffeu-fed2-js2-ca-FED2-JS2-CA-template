import { updatePost } from "../../api/post/update.js";
import { readPost } from "../../api/post/read.js";

const urlParams = new URLSearchParams(window.location.search);
const postIdString = urlParams.get("id");

async function onSubmit(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    
    const postData = {
        title: title,
        content: content,
    };
    
    try {
        const response = await updatePost(postIdString, postData);
        console.log(response);
        window.location.href = "/post/?id=" + response.id;
    } catch (error) {
        console.error("An error occurred during post update:", error);
        alert(error.message);
    }
}

export async function onUpdatePost(event) {

    const fetchPost = await readPost(postIdString);
    document.getElementById("content").textContent = fetchPost.body;
    document.getElementById("title").value = fetchPost.title;

    const form = document.forms.editPost;
    form.addEventListener("submit", onSubmit);
}
