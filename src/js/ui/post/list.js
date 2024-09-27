import { readPosts } from "../../api/post/read.js";
import { deletePost } from "../../api/post/delete.js"; // Add this import

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
    
    if (posts.length === 0) {
      postsContainer.innerHTML = "<p>No posts found.</p>";
      return;
    }

    const postsHTML = posts.map(createPostElement).join('');
    postsContainer.innerHTML = postsHTML;

    // Add event listener for delete buttons
    postsContainer.addEventListener('click', handleDelete);
  } catch (error) {
    console.error("Error displaying posts:", error);
  }
}

function createPostElement(post) {
  return `
    <article class="post">
      <h2>${post.title}</h2>
      ${post.author ? `<p>Posted by: ${post.author.name}</p>` : ''}
      <p>${post.body}</p>
      ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt || 'Post image'}" onerror="this.onerror=null; this.src='/images/fallback-image.jpg'; this.classList.add('error');">` : ''}
      <p>Tags: ${post.tags.join(', ')}</p>
      <p>Comments: ${post._count.comments} | Reactions: ${post._count.reactions}</p>
      <a href="/post/edit/index.html?id=${post.id}" class="edit-post-button">Edit</a>
      <button class="delete-post-button" data-post-id="${post.id}">Delete</button>
    </article>
  `;
}

async function handleDelete(event) {
  if (event.target.classList.contains('delete-post-button')) {
    const postId = event.target.dataset.postId;
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);
        await displayPosts(); // Refresh the post list
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  }
}

export default displayPosts;