alert("Single Post Page");
import { postService } from "../../api/index";
import { getAuthUser } from "../../api/constants";
import { onDeletePost } from "../../ui/post/delete";

async function fetchAndRenderPost() {
  const postId = getPostIdFromUrl();
  if (!postId) {
    console.error("No post ID porvided in the URL");
    return;
  }

  try{
    const result = await postService.post(postId);
    if (result){
        const post = result;
        renderPost(post)
    }else {
        console.error('Failed to fetch post:', result.message);
    }
  }catch(error){
    console.error('Error fetching post:', error);
  }
}

function getPostIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

function renderPost(post){
    const postContainer = document.querySelector('.post-container')
    const currentUser = getAuthUser();
    const isAuthor = currentUser && currentUser.name === post.author.name;

    // const formattedDate = formatDate(post.created);
    // const formattedTags = formatTags(post.tags);

    const postHTML = `
    <article class="single-post">
      ${post?.media ? `<img class="post-banner" src="${post?.media?.url}" alt="${post.title}" class="post-image">` : ''}
      </a>
      <div class="post-content">
        <div class="post-meta">
          <div class="post-meta-inner">
            <a class="profile-link" href="/profile/?username=${post.author.name}">
              <img src="${post.author.avatar.url}" alt="${post.author.name}" class="author-avatar">
            </a>
            <div class="post-info">
              <a class="profile-link" href="/profile/?username=${post.author.name}">
                <span class="author-name">${post.author.name}</span>
              </a>
            
            </div>
          </div>
          <div class="btn-container mw-3 w-100">
            ${isAuthor ? renderEditDeleteButtons(post.id) : ''}
          </div>
        </div>
        <h1 class="post-title">${post.title}</h1>
       
        <div class="post-body">${post.body}</div>
      </div>
    </article>
    `;
    
    postContainer.innerHTML = postHTML;

    if (isAuthor) {
        attachButtonListeners(post.id);
    }
}

function renderEditDeleteButtons(postId){
    return `
    <button id="editPost" class="btn btn-solid">Edit</button>
    <button id="deletePost" class="btn btn-solid btn-danger">Delete</button>
    `
}

function attachButtonListeners(postId){
    const deleteBtn = document.getElementById('deletePost')
    const editBtn = document.getElementById('editPost');

    deleteBtn.addEventListener('click', () => handleDeletePost(postId))
    editBtn.addEventListener('click', () => handleUpdatePost(postId))

}

async function handleDeletePost(postId){
    await onDeletePost(postId)
}
function handleUpdatePost(postId){
  window.location.href = `/post/edit/?id=${postId}`;
}

fetchAndRenderPost()