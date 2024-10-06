//

const BASE_URL = 'https://v2.api.noroff.dev/social/posts';

/**
 * Function to fetch posts
 */
export async function fetchPosts() {
    const accessToken = localStorage.getItem('jwtToken'); // Retrieve the JWT token from localStorage
    const apiKey = localStorage.getItem('apiKey'); // Retrieve the API key from localStorage

    const options = {
        method: 'GET', // Change this to POST, PUT, or DELETE as necessary
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, // Use the stored JWT token
            'X-Noroff-API-Key': apiKey // Use the stored API key
        }
    };

    try {
        const response = await fetch(BASE_URL, options); // Make the API request

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const data = await response.json(); // Parse the JSON response
        console.log('Fetched posts:', data); // Log the posts to the console
        return data; // Return the posts data
    } catch (error) {
        console.error('Error fetching posts:', error); // Handle errors
    }
}

/**
 * Function to create a new post
 */
export async function createPost({ title, body, tags, media }) {
    const accessToken = localStorage.getItem('jwtToken'); // Retrieve the JWT token
    const apiKey = localStorage.getItem('apiKey'); // Retrieve the API key

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, // Use the stored JWT token
            'X-Noroff-API-Key': apiKey // Use the stored API key
        },
        body: JSON.stringify({
            title: title,
            body: body,
            tags: tags,
            media: media
        })
    };

    try {
        const response = await fetch(BASE_URL, options); // Make the API request

        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        const post = await response.json(); // Parse the JSON response
        console.log('Post created:', post); // Log the created post
        return post; // Return the created post data
    } catch (error) {
        console.error('Error creating post:', error); // Handle errors
    }
}

// Other functions like updatePost and deletePost can be implemented similarly

