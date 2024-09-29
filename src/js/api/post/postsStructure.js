
export const displayPosts = (posts, loggedInUserName) => {
    const postContainer = document.getElementById("postsContainer");

    if (!postContainer) {
        console.error("No container with the id 'postsContainer' found.");
        return;
    }

    posts.forEach((post) => {
        const container = document.createElement("div");
        container.className = "postContainer";

        const title = document.createElement("h2");
        title.innerText = post.title;

        const userName = document.createElement("p");
        userName.innerText = post.author?.name || "Unknown Author";
        userName.className = "postAuthor";

        const postDate = document.createElement("p");
        postDate.innerText = new Date(post.created).toLocaleDateString();
        postDate.className = "postDate";

        const text = document.createElement("p");
        text.innerText = post.body;

        const tags = document.createElement("p");
        tags.innerText = Array.isArray(post.tags) ? post.tags.join(", ") : post.tags;

        const image = document.createElement("img");

        if (post.media && post.media.url) {
            image.src = post.media.url;
            image.alt = post.media.url;
            image.className = "postImage";
            container.append(image);
        }

        const viewPostButton = document.createElement("button");
        viewPostButton.innerText = "View Post";
        viewPostButton.className = "viewPostButton";


        // Add event listener to the view post button
        viewPostButton.addEventListener("click", () => {
            window.location.href = `/post/?id=${post.id}`;
            localStorage.setItem("postId", JSON.stringify(post.id))
        });

        // Append all elements to the container
        container.append(title, userName, postDate, text, tags, viewPostButton);
        postContainer.append(container);
    });
};