import { readPosts } from "../../api/post/read.js";

export async function displayPosts() {
  try {
    const postsContainer = document.querySelector("#posts-container");
    if (!postsContainer) {
      console.error("Posts container not found");
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
    </article>
  `;
}

// Export displayPosts as the default
export default displayPosts;