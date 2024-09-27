import { fetchPostById, displayPost } from "../../api/post/getPost.js";

alert("Single Post Page");

async function initPostPage() {
    fetchPostById()
    displayPost()
}

initPostPage();