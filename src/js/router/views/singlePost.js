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
        console.log(isAuthor)
        
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

displaySinglePost()