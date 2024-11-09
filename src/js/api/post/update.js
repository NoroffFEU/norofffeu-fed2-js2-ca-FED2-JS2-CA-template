import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

// Retrieve the post ID from the URL parameters
const postId = new URLSearchParams(window.location.search).get('id');

// Get form input elements based on your HTML structure
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const categorySelect = document.getElementById('category');
const imageInput = document.getElementById('image'); // Image file input

// Function to fetch the current post data and populate the form
async function fetchPostData() {
    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
            headers: headers(),
            method: "GET",
        });

        if (!response.ok) {
            throw new Error('Failed to fetch post data');
        }

        const postData = await response.json();
        populateForm(postData); // Populate form fields with fetched data
    } catch (error) {
        console.error('Error fetching post:', error);
        alert('Error loading post data: ' + error.message);
    }
}

// Populate form fields with the fetched post data
function populateForm(post) {
    titleInput.value = post.title;
    contentInput.value = post.body; // Assuming 'body' corresponds to 'content'
    categorySelect.value = post.tags[0] || 'others'; // Select the first tag as category
    // Note: Since image input is a file, it cannot be pre-populated directly.
}

// Function to update the post
async function updatePost() {
    // Gather data from form fields
    const updatedPostData = {
        title: titleInput.value,
        body: contentInput.value,
        tags: [categorySelect.value], // Using selected category as the single tag
    };

    // Optionally add media if an image is selected
    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        
        reader.onloadend = async () => {
            updatedPostData.media = { url: reader.result }; // Assuming the backend accepts base64 data

            // Send the update request
            try {
                await sendUpdateRequest(updatedPostData);
            } catch (error) {
                alert("Updating post failed: " + error.message);
            }
        };
        
        reader.readAsDataURL(file); // Read file as base64
    } else {
        // Send update request if no image is selected
        await sendUpdateRequest(updatedPostData);
    }
}

// Helper function to send the update request
async function sendUpdateRequest(data) {
    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
            method: "PUT",
            headers: headers(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to update post");
        }

        alert("Post updated successfully!");
        window.location.href = '/'; // Redirect to home page
    } catch (error) {
        console.error("Error updating post:", error);
        alert("Updating post failed: " + error.message);
    }
}

// Event listener for the form submission
document.forms["editPost"].addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission
    updatePost(); // Call the updatePost function
});

// Fetch post data on page load
fetchPostData();
