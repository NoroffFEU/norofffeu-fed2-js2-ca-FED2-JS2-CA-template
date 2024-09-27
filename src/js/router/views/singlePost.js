import NoroffAPI from "../../api";
import { getCurrentUser } from "../../utilities/currentUser";
const api = new NoroffAPI()
export async function displaySinglePost(){
    try
    {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');
        if (!postId) {
            console.log("Error: Post ID not found in the URL", postId);
            return;
        }
        const post = await api.post.readSinglePost(postId, { _author: true })
        const {user} = getCurrentUser();
        const isAuthor = post.data.author && post.data.author.name === user.name;
        const singlePostCon = document.getElementById('detailPostCon');
        const tags = Array.isArray(post.data.tags) ? post.data.tags : [];
        const postHTML =
            `
            <div class="singlePost">
                <h2>${post.data.title}</h2>
                <p>${post.data.body}</p>
                <p><strong>Tags:</strong> ${tags.join(", ")}</p>
                ${post.data.media && post.data.media.url ? `<img src="${post.data.media.url}" alt="${post.data.media.alt || 'Post Media'}">` : ""}
                ${isAuthor ? `<button class="editSinglePostBtn" onclick="window.location.href='/post/edit/?id=${post.data.id}'">Edit Post</button` : "" }>
            </div>
        `;
        singlePostCon.innerHTML = postHTML;
    }catch (error){
        console.log(`Error displaying posts: ${error.message}`);
    }
}

async function submitComment (postId){
    const commentBody = document.getElementById("commentInput").value.trim();
    if(!commentBody){
        console.log("Comment acannot be empty");
        return;
    }
    try{
        const response = await api.post.CommentOnPost(postId, commentBody)
        if(response){
            console.log("comment successfully posted");
            displayComments(postId);
        }
    }catch(error){
        console.log(`failed to post comment: ${error.message}`);
    }
}
document.getElementById("commentForm").addEventListener("submit", (event) => {
    event.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    const postId =urlParams.get('id')
    submitComment(postId)
    displayComments(postId)
})
async function displayComments(postId){
    try{
        const response = await api.post.CommentOnPost(postId)
        console.log(response)
        const comments = response.comments
        const commentsList = document.getElementById('commentsList')
        commentsList.innerHTML = ""
    
        comments.forEach((comment) => {
            const commentElement = document.createElement('div')
            commentElement.classList.add("comment")
            commentElement.innerHTML = `
            <p><strong>${comment.owner}:</strong> ${comment.body}</p>
            `
            commentsList.appendChild(commentElement);
        })
    }catch(error){
        console.error("Error fetching comments:", error);
        commentsList.innerHTML = "<p>Failed to load comments.</p>";
    }
}
displaySinglePost()
