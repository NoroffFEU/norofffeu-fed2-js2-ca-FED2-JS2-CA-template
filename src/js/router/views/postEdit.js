import { readPost } from "../../api/post/read";
import { setLogoutListener } from "../../ui/global/logout";
import { onUpdatePost } from "../../ui/post/update";
import { authGuard } from "../../utilities/authGuard";

const postId = JSON.parse(localStorage.getItem("postId"));

async function loadPost() {

    try {
        const post = await readPost();
        if (post || post.data) {
            formEditPost.title.value = post.title;
            formEditPost.body.value = post.body; 
            formEditPost.tags.value = post.tags?.join(', ') || ''; 
            formEditPost.image.value = post.media?.url || ''; 
            formEditPost.alt.value = post.media?.alt || ''; 
            
        } else {
            console.error("Post not found");
        }
    } catch (error) {
        console.error("Error loading post:", error);
    }
}

const formEditPost = document.forms['editPost'];
formEditPost.addEventListener('submit', (event) => onUpdatePost(event, postId));
loadPost();

setLogoutListener()

authGuard();