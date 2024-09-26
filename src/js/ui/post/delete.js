import { deletePost } from "../../api/post/delete";

export async function onDeletePost(event) {
    console.log(event);

    if (confirm("Are you sure you want to delete this post?")) {
        try {
            const success = await deletePost(event);
            if (success) {
                window.location.reload();

                alert("Post deleted successfully");
            } else {
                alert("Failed to delete post.");
            }
        } catch (error) {
            console.error("Failed to delete post:", error);
            alert("Failed to delete post.");
        }
    }
}
