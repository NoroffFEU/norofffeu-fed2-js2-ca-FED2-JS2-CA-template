import { readPost } from "../../api/post/read.js";
import { onReadPost } from "../../ui/post/read";

const urlParams = new URLSearchParams(window.location.search);
const postIdString = urlParams.get("id");

try {
    const post = await readPost(postIdString);
    onReadPost(post)
} catch (error) {
    console.error("An error occurred during post reading:", error);
    alert(error.message);
}

// alert("Single Post Page");