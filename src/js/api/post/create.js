const BASE_URL = 'https://v2.api.noroff.dev/posts';

// Create a new post
export async function createPost({ title, body, tags, media }) {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your token
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating post:', error);
    }
}




// Get a post by ID
export async function getPost(postId) {
    try {
        const response = await fetch(`${BASE_URL}/${postId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your token
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch post');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching post:', error);
    }
}

// src/components/PostForm.js

import { createPost } from '../api/postAPI.js';

document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const postData = {
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
    };
    
    const newPost = await createPost(postData);
    console.log('Post created:', newPost);
});
