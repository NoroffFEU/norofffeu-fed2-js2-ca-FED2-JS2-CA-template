import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Function to create a new post.
 * @param {Object} postDetails - Contains title, content, category, and media URL.
 * @returns {Object} - The created post data.
 * @throws {Error} - Throws an error if the post creation fails.
 */
export async function createPost({ title, content, category, mediaUrl }) {
    // Construct post data according to your form's structure
    const postData = {
        title,
        body: content,  // Assuming 'content' maps to 'body' in the API
        tags: category.split(',').map(tag => tag.trim()), // Splitting category by commas to form tags array
        media: mediaUrl ? { url: mediaUrl } : null, // Only include media if URL is provided
    };

    const options = {
        method: 'POST',
        headers: headers(), // Use headers() to include required headers like API key or token
        body: JSON.stringify(postData),
    };

    try {
        const response = await fetch(API_SOCIAL_POSTS, options);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error creating post:', errorData);
            throw new Error('Failed to create post: ' + (errorData.message || 'Unknown error'));
        }

        const createdPost = await response.json();
        console.log('Post created successfully:', createdPost);
        return createdPost;
    } catch (error) {
        console.error('Error creating post:', error);

        if (error.name === 'TypeError') {
            alert('Network error, please try again later.');
        } else {
            alert(`Error creating post: ${error.message}`);
        }

        throw error;
    }
}

// Event listener for form submission, strictly matching your HTML structure
document.forms["createPost"]?.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Retrieve values from form inputs
    const title = document.getElementById("postTitle").value.trim();
    const content = document.getElementById("postContent").value.trim();
    const category = document.getElementsByName("postCategorie")[0].value.trim();
    const mediaUrl = document.getElementsByName("postMedia-url")[0].value.trim();

    try {
        const createdPost = await createPost({
            title,
            content,
            category,
            mediaUrl,
        });

        console.log("Post created:", createdPost);

        // Provide feedback to the user and redirect
        alert("Post created successfully!");
        window.location.href = "/";  // Redirect to homepage or relevant page
    } catch (error) {
        console.error("Failed to create post:", error);
        alert("Failed to create post: " + error.message);
    }
});
