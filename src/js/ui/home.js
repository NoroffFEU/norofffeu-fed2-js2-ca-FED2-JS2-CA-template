// Showing posts on home page. This is the same as the posts page, but it shows all posts by all users.
export async function onReadPosts(posts) {
  const postsList = document.getElementById("posts-list");
  posts.forEach((post) => {
    const postTemplate = document.getElementById("post-template");
    const postClone = postTemplate.content.cloneNode(true);
    postClone.children[0].addEventListener("click", () => {
      window.location.href = `/post/?id=${post.id}`;
    });
    postClone.getElementById("title").textContent = post.title;
    postClone.getElementById("content").textContent = post.body;
    if (post.media) {
      postClone.getElementById("card-img-top").src = post.media.url;
    }
    postsList.appendChild(postClone);
  });
}
