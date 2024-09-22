alert("Single Post Page");

import NoroffAPI from "../../api";
import { readPosts } from "../../api/post/read";
import { renderPagination } from "../../utilities/pagination";
import { displayPosts } from "../../utilities/displayHTML";
import { searchPosts } from "../../utilities/search";


const api = new NoroffAPI();


export async function loadPost(limit=12,page = 1){

    try{
        const {posts, currentPage, totalPages} = await readPosts (limit, page)

        displayPosts();
        
        renderPagination (totalPages, currentPage)

    }catch(error){
        alert("Error loading posts")
    }
}

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

