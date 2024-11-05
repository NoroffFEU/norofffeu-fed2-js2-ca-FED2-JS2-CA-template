import { readPosts, readPost } from "../../api/post/read.js";
import { deletePost } from "../../api/post/delete.js";
import { setupCommentFunctionality } from "./comment.js";

let isDisplayingSinglePost = false;


 /**
 * Sets up the home page, including the create post button and initial post display.
 * @function setupHomePage 
 * @returns {void}
 * @example
 * // Call this function when the home page loads
 * setupHomePage();
 */

 export function setupHomePage() {
  const isLoggedIn = !!localStorage.getItem('token');
  console.log("Is logged in:", isLoggedIn); // Debug log

  const createPostButton = document.getElementById('create-post-button');
  console.log("Create post button:", createPostButton); // Debug log

  if (createPostButton) {
    if (isLoggedIn) {
      createPostButton.className = "bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md transition-colors";
    } else {
      createPostButton.className = "hidden";
    }
  }

  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    displayPosts();
  }
}

/**
 * Fetches and displays all posts on the home page.
 * @async 
 * @function displayPosts
 */

export async function displayPosts() {
  console.log("displayPosts function called");
  try {
    const postsContainer = document.querySelector("#posts-container");
    console.log("Posts container element:", postsContainer);
    
    if (!postsContainer) {
      console.error("Posts container not found. Make sure your HTML has an element with id 'posts-container'");
      return;
    }
    
    const { data: posts } = await readPosts();
    console.log('Posts data:', posts);
    
    if (!posts || posts.length === 0) {
      const isLoggedIn = !!localStorage.getItem('token');
      if (isLoggedIn) {
        postsContainer.innerHTML = "<p>No posts found. Be the first to create a post!</p>";
      } else {
        postsContainer.innerHTML = "<p>Please log in to view and create posts.</p>";
      }
      return;
    }
    
    const postsHTML = posts.map(createPostElement).join('');
    postsContainer.innerHTML = postsHTML;
    
    setupPostEventListeners();
  } catch (error) {
    console.error("Error displaying posts:", error);
    const postsContainer = document.querySelector("#posts-container");
    if (postsContainer) {
      postsContainer.innerHTML = "<p>Error loading posts. Please try again later.</p>";
    }
  }
}

/**
 * Creates an HTML element for a single post.
 * @function
 * @param {Object} post - The post data.
 * @returns {string} HTML string for the post.
 */

function createPostElement(post) {
  return `
    <article class="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow" data-post-id="${post.id}">
      <h2 class="text-2xl font-semibold text-gray-800 mb-2">${post.title}</h2>
      ${post.author ? `<p class="text-gray-600 mb-2">Posted by: ${post.author.name}</p>` : ''}
      <p class="text-gray-700 mb-4">${post.body}</p>
      ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt || 'Post image'}" class="max-w-[250px] h-auto rounded-md mb-4 object-cover" onerror="this.onerror=null; this.src='/images/fallback-image.jpg'; this.classList.add('error');">` : ''}
      <p class="text-gray-600 text-sm mb-2">Tags: ${post.tags.join(', ')}</p>
      <p class="text-gray-600 text-sm mb-4">Comments: ${post._count.comments} | Reactions: ${post._count.reactions}</p>
      <div class="flex space-x-2">
        <a href="/post/edit/index.html?id=${post.id}" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors">Edit</a>
        <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors" data-post-id="${post.id}">Delete</button>
      </div>
    </article>
  `;
}

/**
 * Sets up event listeners for post interactions.
 * @function setupPostEventListeners
 */

function setupPostEventListeners() {
  const postsContainer = document.querySelector("#posts-container");
  if (!postsContainer) return;

  postsContainer.removeEventListener('click', handlePostClick);
  postsContainer.addEventListener('click', handlePostClick);
}

/**
 * Handles click events on posts.
 * @function
 * @param {Event} event - The click event.
 */

function handlePostClick(event) {
  const postElement = event.target.closest('.post');
  if (!postElement) return;

  const postId = postElement.dataset.postId;

  if (event.target.classList.contains('delete-post-button')) {
    handleDelete(postId);
  } else if (!event.target.closest('a, button')) {
    displaySinglePost(postId);
  }
}

/**
 * Handles the deletion of a post.
 * @async
 * @function
 * @param {string} postId - The ID of the post to delete.
 */

async function handleDelete(postId) {
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      await deletePost(postId);
      await displayPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  }
}

/**
 * Displays a single post and its comments.
 * @async 
 * @function displaySinglePost
 * @param {string} postId - The ID of the post to display.
 */

export async function displaySinglePost(postId) {
  if (isDisplayingSinglePost) return;
  isDisplayingSinglePost = true;

  console.log("Displaying single post:", postId);
  
  const postsContainer = document.querySelector('#posts-container');
  const singlePostContainer = document.querySelector('#single-post-container');
  const postContent = document.querySelector('#post-content');
  
  if (!singlePostContainer || !postContent) {
    console.error("Single post container or post content element not found");
    isDisplayingSinglePost = false;
    return;
  }

  postsContainer.style.display = 'none';
  singlePostContainer.style.display = 'block';

  try {
    const { data: postData } = await readPost(postId);
    
    postContent.innerHTML = `
      <article class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">${postData.title}</h2>
        ${postData.author ? `<p class="text-gray-600 mb-2">Posted by: ${postData.author.name}</p>` : ''}
        <p class="text-gray-700 mb-4">${postData.body}</p>
        ${postData.media ? `<img src="${postData.media.url}" alt="${postData.media.alt || 'Post image'}" class="max-w-[250px] h-auto rounded-md mb-4 object-cover" onerror="this.onerror=null; this.src='/images/fallback-image.jpg'; this.classList.add('error');">` : ''}
        <p class="text-gray-600 text-sm mb-2">Tags: ${postData.tags.join(', ')}</p>
        <p class="text-gray-600 text-sm mb-4">Comments: ${postData._count.comments} | Reactions: ${postData._count.reactions}</p>
      </article>
    `;
    setupCommentFunctionality(postId);
    
    const backButton = document.getElementById('back-to-posts');
    if (!backButton) {
      const newBackButton = document.createElement('button');
      newBackButton.id = 'back-to-posts';
      newBackButton.textContent = 'Back to Posts';
      newBackButton.className = 'mt-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors';
      newBackButton.addEventListener('click', () => {
        singlePostContainer.style.display = 'none';
        postsContainer.style.display = 'block';
      });
      singlePostContainer.appendChild(newBackButton);
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    postContent.innerHTML = '<p>Error loading post</p>';
  } finally {
    isDisplayingSinglePost = false;
  }
}