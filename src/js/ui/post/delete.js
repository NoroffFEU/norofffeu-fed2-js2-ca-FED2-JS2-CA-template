import { postService } from "../../api/index";

export async function onDeletePost(postId) {
    console.log("postId",postId)
    
    const confirmDelete = confirm("Are you sure you want to delete this post?")
    if(!confirmDelete) return

    try{
        const result = await postService.delete(postId);
        alert('Post deleted successfully');
        window.location.href = '/'
        if(response){
            alert("Post successfully Delete")
        }else {
            console.error('Failed to delete post:', result.message);
            alert('Error deleting post');
          }
    }catch(error){
        console.error('Error deleting post:', error);
        alert('An error occurred while deleting the post.');
    }
}
