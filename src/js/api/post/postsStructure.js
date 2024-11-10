export const displayPosts = (posts, loggedInUserName) => {
    const postContainer = document.getElementById("postsContainer");

    if (!postContainer) {
        console.error("No container with the id 'postsContainer' found.");
        return;
    }

    postContainer.innerHTML = '';

    posts.forEach((post) => {
        const container = document.createElement("article");
        container.className = "bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8 overflow-hidden hover:shadow-lg transition-shadow duration-300";

        // User Info Section
        const userInfoContainer = document.createElement("div");
        userInfoContainer.className = "flex items-center justify-between px-6 py-4 border-b dark:border-gray-700";

        const userWrapper = document.createElement("div");
        userWrapper.className = "flex items-center space-x-3";

        const userAvatar = document.createElement("div");
        userAvatar.className = "w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg";
        userAvatar.innerText = post.author?.name?.charAt(0).toUpperCase() || "?";

        const userName = document.createElement("div");
        userName.className = "flex flex-col";
        
        const name = document.createElement("p");
        name.innerText = post.author?.name || "Unknown Author";
        name.className = "font-medium text-gray-900 dark:text-white";

        const postDate = document.createElement("p");
        postDate.innerText = new Date(post.created).toLocaleDateString();
        postDate.className = "text-sm text-gray-500 dark:text-gray-400";

        userName.append(name, postDate);
        userWrapper.append(userAvatar, userName);
        userInfoContainer.append(userWrapper);

        // Title Section
        const title = document.createElement("h2");
        title.className = "text-xl font-semibold text-gray-900 dark:text-white p-6";
        title.innerText = post.title;

        // Text Section
        const text = document.createElement("p");
        text.className = "p-6 text-gray-600 dark:text-gray-300";
        text.innerText = post.body;

        // Tags Section
        const tags = document.createElement("p");
        tags.className = "px-6 pb-6 text-sm text-blue-500 dark:text-blue-400";
        tags.innerText = Array.isArray(post.tags) ? post.tags.join(", ") : post.tags;

        // Image Section (if exists)
        if (post.media && post.media.url) {
            const imageContainer = document.createElement("div");
            imageContainer.className = "relative aspect-video overflow-hidden";

            const image = document.createElement("img");
            image.src = post.media.url;
            image.alt = post.title;
            image.className = "w-full h-full object-cover";

            imageContainer.append(image);
            container.append(imageContainer);
        }

        // View Post Button
        const viewPostButton = document.createElement("button");
        viewPostButton.innerText = "View Post";
        viewPostButton.className = "w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 transition-colors duration-200";

        viewPostButton.addEventListener("click", () => {
            window.location.href = `/post/?id=${post.id}`;
            localStorage.setItem("postId", JSON.stringify(post.id))
        });

        // Append all elements in the correct order
        container.append(userInfoContainer, title, text, tags, viewPostButton);
        postContainer.append(container);
    });
};