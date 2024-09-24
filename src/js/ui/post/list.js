import { readPosts } from "../../api/post/read.js";

export async function displayPosts() {
  try {
    const postsContainer = document.querySelector("#posts-container");
    if (!postsContainer) {
      console.error("Posts container not found");
      return;
    }

    const { data: posts } = await readPosts();
    
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
  // This is where we'll make our changes
  return `
    <article class="post">
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt || 'Post image'}">` : ''}
      <p>Tags: ${post.tags.join(', ')}</p>
      <p>Comments: ${post._count.comments} | Reactions: ${post._count.reactions}</p>
    </article>
  `;
}