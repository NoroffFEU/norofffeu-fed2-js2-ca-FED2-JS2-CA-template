alert("Single Post Page");

import NoroffAPI from "../../api";
// import { readPosts } from "../../api/post/read";
// import { renderPagination } from "../../utilities/pagination";
// import { displayPosts } from "../../utilities/displayHTML";
// import { searchPosts } from "../../utilities/search";
// import { getCachedPosts } from "../../api/post/read";

const api = new NoroffAPI();




async function displayAllPost() {

    const posts = await api.getPosts();
    console.log(111, posts.data);
    const postsContainer = document.getElementById("getAllPosts");
    console.log(2, getAllPosts);
    const postsHTML = posts.data
      .map(
        (posts) => `
          <div class="post" onclick="window.location.href='/post/detail/?id=${posts.id}'">
             <h2>${posts.title}</h2>
             <p>${posts.body}</p>
             <p><strong>Tags:</strong> ${posts.tags.join(", ")}</p>
             ${posts.media && posts.media.url ? `<img src="${posts.media.url}" alt="${posts.media.alt || 'posts Media'}">` : ""}
        </div>
          </div>
      `
      )
      .join("");
  
    postsContainer.innerHTML = postsHTML;
  }
  displayAllPost();



// export async function loadPost(limit=12,page = 1){
//     const cacheKey = `_posts_${limit}_${page}`;
//     const cachedPosts = getCachedPosts(cacheKey);

//     if (cachedPosts) {
      
//         const { currentPage, totalPages } = cachedPosts;
//         displayPosts(cachedPosts.posts); 
//         renderPagination(totalPages, currentPage);

//         return; 
//     }
//     try{
//         const data = await readPosts (limit, page)
//         console.log(data)

//         displayPosts(data.posts);
        
//         renderPagination (data.currentPage, data.totalPages)

//     }catch(error){
//         console.log("Error loading posts",error)
//     }
// }
// const searchBtn = document.getElementById('searchSubmitBtn');
// searchBtn.addEventListener('click', searchPosts);

// document.addEventListener("DOMContentLoaded", () => {
//     const searchBtn = document.getElementById('searchSubmitBtn');
    
//     // Check if the element exists before adding the event listener
//     if (searchBtn) {
//         searchBtn.addEventListener('click', searchPosts);
//     } else {
//         console.error('Search button not found');
//     }
// });


// loadPost();

