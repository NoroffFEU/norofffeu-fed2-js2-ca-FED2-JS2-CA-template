alert("Single Post Page");

import NoroffAPI from "../../api";
import { readPosts } from "../../api/post/read";
import { renderPagination } from "../../utilities/pagination";
import { displayPosts } from "../../utilities/displayHTML";
import { searchPosts } from "../../utilities/search";
import { getCachedPosts } from "../../api/post/read";

const api = new NoroffAPI();


export async function loadPost(limit=12,page = 1){
    const cacheKey = `_posts_${limit}_${page}`;
    const cachedPosts = getCachedPosts(cacheKey);

    if (cachedPosts) {
      
        const { currentPage, totalPages } = cachedPosts;
        displayPosts(cachedPosts.posts); 
        renderPagination(totalPages, currentPage);

        return; 
    }
    try{
        const {posts, currentPage, totalPages} = await readPosts (limit, page)

        displayPosts(posts);
        
        renderPagination (totalPages, currentPage)

    }catch(error){
        console.log("Error loading posts",error)
    }
}
// const searchBtn = document.getElementById('searchSubmitBtn');
// searchBtn.addEventListener('click', searchPosts);

document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById('searchSubmitBtn');
    
    // Check if the element exists before adding the event listener
    if (searchBtn) {
        searchBtn.addEventListener('click', searchPosts);
    } else {
        console.error('Search button not found');
    }
});


loadPost();

