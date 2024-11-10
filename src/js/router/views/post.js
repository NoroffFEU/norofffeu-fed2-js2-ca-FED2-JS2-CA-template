import { readPost } from "../../api/post/read";
import { onDeletePost } from "../../ui/post/delete";

export const displayPost = (post) => {
    const postContainer = document.getElementById("postsContainer");

    if (!postContainer) {
        console.error("No container with the id 'postsContainer' found.");
        return;
    }

    const container = document.createElement("article");
    container.className = "bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-4xl mx-auto";

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
    userInfoContainer.appendChild(userWrapper);

    // Image Section (if exists)
    if (post.media && post.media.url) {
        const imageContainer = document.createElement("div");
        imageContainer.className = "relative aspect-video overflow-hidden";

        const image = document.createElement("img");
        image.src = post.media.url;
        image.alt = post.media.alt || post.title;
        image.className = "w-full h-full object-cover";
        
        imageContainer.appendChild(image);
        container.appendChild(imageContainer);
    }

    // Content Section
    const contentSection = document.createElement("div");
    contentSection.className = "p-6";

    const title = document.createElement("h1");
    title.className = "text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4";
    title.innerText = post.title;

    const text = document.createElement("p");
    text.className = "text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed";
    text.innerText = post.body;

    // Tags Section
    const tagsContainer = document.createElement("div");
    tagsContainer.className = "flex flex-wrap gap-2 mb-6";

    if (Array.isArray(post.tags) && post.tags.length > 0) {
        post.tags.forEach(tag => {
            const tagSpan = document.createElement("span");
            tagSpan.className = "inline-block bg-blue-500 text-white px-2 py-1 rounded-md";
            tagSpan.innerText = tag;
            tagsContainer.appendChild(tagSpan);
        });
    }

    // Action Buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "flex items-center justify-end space-x-3 mt-4 border-t dark:border-gray-700 pt-4";

    const editButton = document.createElement('button');
    editButton.className = "inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium";
    editButton.innerHTML = `
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Edit Post
    `;
    editButton.addEventListener('click', () => window.location.href = `/post/edit/?id=${post.id}`);

    const deleteButton = document.createElement('button');
    deleteButton.className = "inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium";
    deleteButton.innerHTML = `
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete Post
    `;
    deleteButton.addEventListener('click', () => onDeletePost(post.id));

    buttonContainer.append(editButton, deleteButton);
    contentSection.append(title, text, tagsContainer, buttonContainer);

    container.appendChild(contentSection);

    postContainer.appendChild(container);
};


async function runPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (!postId) {
        console.error("No post ID provided");
        return;
    }

    try {
        const post = await readPost(postId);
        displayPost(post);
    } catch (error) {
        console.error("Error fetching post:", error);
    }
}

runPage();