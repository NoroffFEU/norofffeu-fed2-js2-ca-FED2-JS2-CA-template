import { authGuard } from "../../utilities/authGuard";
authGuard();

import { postService } from "../../api/index";

let currentPage = 1;
let totalPage = 1;
let isLoading = false;

const postGrid = document.querySelector(".post-grid");

async function fetchPosts(page = currentPage) {
  // if(isLoading) return;
  // isLoading = true

  try {
    const result = await postService.getAll(page);
    console.log("Home",result);

    if (result) {
      const posts = result;
      // const dataPage = result;

      // currentPage = newCurrentPage;
      // totalPages = pageCount;

      renderPosts(posts);
    } else {
      console.error("Failed to fetch posts:", result.message);
    }
  } catch (error) {
    console.error("Error loading posts:", error);
  } finally {
    isLoading = false;
  }
}

function renderPosts (posts){
  if(!Array.isArray(posts)){
    console.error('Expected an array of posts');
    return;
  }

  const postElements = posts.map((post) =>{
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    // const formattedDate = formatDate(post.created);
    // const formattedTags = formatTags(post.tags)

    postElement.innerHTML = `
    <div class="post-meta">
      <a class="profile-link" href="/profile/?username=${post.author.name}">
        <img class="author-avatar" src="${post.author.avatar.url}" alt="${post.author.avatar.alt}" />
      </a>
      <div class="post-info">
        <a class="profile-link" href="/profile/?username=${post.author.name}"><span class="mb--1"><small>${post.author.name}</small></span></a>
       
      </div>
    </div>
    <a class="post-details-link" href="/post/?id=${post.id}">
      <h2>${post.title}</h2>
    </a>
    
    `;

    return postElement;
  })

  postGrid.append(...postElements);
}

fetchPosts();


export function sum(a, b) {
  return a + b;
}
