alert("Single Post Page");

import NoroffAPI from "../../api";
import { readPosts } from "../../api/post/read";

const api = new NoroffAPI();

async function displayPosts(event){
    
    try
    {
    const posts = event;
   
    if (Array.isArray(posts)){
        const postsContainer = document.getElementById("postsContainer");
      
       
        const postsHTML = posts.map(post =>
            `
           <div class="post" onclick="window.location.href='/post/edit/?id=${post.id}'">
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


function renderPagination (totalPages, currentPage){
    const paginationCon = document.getElementById("paginationContainer");
    paginationCon.innerHTML = '';

    if (currentPage > 1){
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '&lt;';
        prevButton.addEventListener('click', () => displayPosts(currentPage -1) );
        paginationCon.appendChild(prevButton);
    }

    for (let page = 1; page <= totalPages; page++){
        const pageButton = document.createElement('button');
        pageButton.innerText = page

        if (page === currentPage){
            pageButton.disabled  = true; 
        }
        pageButton.addEventListener('click', () => displayPosts(page))
        paginationCon.appendChild(pageButton)
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button')
        nextButton.innerHTML = '&gt;' ;
        nextButton.addEventListener('click', () => displayPosts(currentPage + 1))
        paginationCon.appendChild(nextButton)
    }
}

async function loadPost(page = 1){
    const {posts, totalPages, currentPage} = await readPosts (12, page,)

    displayPosts(posts);
    
    renderPagination (totalPages, currentPage)
}

loadPost(1);

