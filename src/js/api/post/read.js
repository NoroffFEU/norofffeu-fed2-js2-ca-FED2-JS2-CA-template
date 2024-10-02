export async function readPost(id) {}

export async function readPosts(limit = 12, page = 1, tag) {}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {}


const BASE_URL = 'https://v2.api.noroff.dev/posts';

// Function to get all posts
export async function getPosts(token) {
    try {
        const response = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Include the user's access token
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error; // Re-throw the error for handling in the component
    }
}

// Function to get a post by ID
export async function getPost(postId, token) {
    try {
        const response = await fetch(`${BASE_URL}/${postId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Include the user's access token
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch post');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error; // Re-throw the error for handling in the component
    }
}
