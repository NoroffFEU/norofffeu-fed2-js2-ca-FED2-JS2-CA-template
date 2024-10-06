import { headers } from "../headers"; 
const BASE_URL = 'https://v2.api.noroff.dev/social/posts';

export async function createPost({ title, body, tags, media }) {
    const options = {
        method: 'POST',
        headers: headers(), 
        body: JSON.stringify({ title, body, tags, media }) 
    };

    try {
        const response = await fetch(BASE_URL, options);

        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error('Failed to create post: ' + errorText);
        }

        const post = await response.json(); 
        console.log('Post created:', post); 
        return post; 
    } catch (error) {
     
        if (error.name === 'TypeError') {
            alert('Network error, please try again later.');
        } else {
            alert(`Error creating post: ${error.message}`);
        }
        console.error('Error creating post:', error);
        throw error; 
    }
}

