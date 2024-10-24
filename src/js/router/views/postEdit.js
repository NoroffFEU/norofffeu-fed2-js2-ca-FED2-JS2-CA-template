import { authGuard } from "../../utilities/authGuard";
import { postService } from "../../api/index";
import { onUpdatePost } from "../../ui/post/update";

authGuard();

async function fetchAndUpdatePost(){
  const postId = new URLSearchParams(window.location.search).get('id')
  
  if (!postId) {
    console.error('No post ID provided in the URL')
    return;
  }

  try{
    const result = await postService.post(postId);
    if(result){
      populateForm(result)
    }else{
      console.error('Failed to fetch post:', result.message);
    }
  }catch(error){
    console.error('Error fetching post:', error);
  }
}


function populateForm(post){
  const form = document.forms['editPost'];
  form.title.value = post.title
  form.body.value = post.body || '';
  form.tags.value = post.tags ? post.tags.join(', ') : '';
  form.media.value = post.media?.url || '';
}

fetchAndUpdatePost()

document.getElementById('updatePost').addEventListener('click', async (event) => {
  const postId = new URLSearchParams(window.location.search).get('id')
  console.log("test",postId)
  await onUpdatePost(postId, event)
})

function handleCancelBtn (event){
  event.preventDefault();
  window.location.href = '/';
}

document.getElementById('cancelUpdate').addEventListener('click', handleCancelBtn)