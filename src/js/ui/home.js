import { readPosts } from "../api/post/read";

export async function onReadPosts() {
    try {
        const posts = await readPosts();
        console.log(posts);

        const postsList = document.getElementById("posts-list");
        posts.forEach((post) => {
            const postTemplate = document.getElementById("post-template");
            const postClone = postTemplate.content.cloneNode(true);
            postClone.children[0].addEventListener("click", () => {
                window.location.href = `/post/?id=${post.id}`;
            });
            postClone.getElementById("title").textContent = post.title;
            postClone.getElementById("content").textContent = post.body;
            postsList.appendChild(postClone);
        });

    } catch (error) {
        console.error("Failed to fill posts:", error);
        alert(error.message);
    }
}

