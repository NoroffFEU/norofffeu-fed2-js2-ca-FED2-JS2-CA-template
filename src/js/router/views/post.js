alert("Single Post Page");

import NoroffAPI from "../../api";
import { readPosts } from "../../api/post/read";
import { renderPagination } from "../../utilities/pagination";


const api = new NoroffAPI();


async function displayPosts(posts){
    
    try
    {

    if (Array.isArray(posts)){
        const postsContainer = document.getElementById("postsContainer");
    
        const postsHTML = posts.map(post =>
            `
            <div class="post" onclick="window.location.href='/post/detail/?id=${post.id}'">
                 <h2>${post.title}</h2>
                 <p>${post.body}</p>
                 <p><strong>Tags:</strong> ${post.tags.join(", ")}</p>
                 ${post.media && post.media.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'Post Media'}">` : ""}
            </div>
             `
         ).join('');
           
            postsContainer.innerHTML = postsHTML
       

    }else {
        alert("Error: Data is not in the expected format");
    }
    }catch (error){
        alert(`Error displaying posts: ${error.message}`);
    }
}


async function searchPosts(){
    const query = document.getElementById('searchQuery').value.trim();
    if(!query){
        alert("Emty text box, please search..");
        return;
    }

    try{
        const posts  = await api.search.read(query);
        const postData = posts.data

        displayPosts(postData); 

    
    } catch(error){
        alert("Failed to search Posts", error)
    }
}

export async function loadPost(page = 1){

    try{
        const {posts, currentPage, totalPages} = await readPosts (12, page)

        displayPosts(posts);
        
        renderPagination (totalPages, currentPage)

    }catch(error){
        alert("Error loading posts")
    }
}

// const searchBtn = document.getElementById('searchSubmitBtn')
// searchBtn.addEventListener('click', searchPosts)


loadPost();

