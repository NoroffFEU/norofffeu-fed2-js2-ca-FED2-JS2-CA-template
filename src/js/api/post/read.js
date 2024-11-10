import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

export async function readPost(id) {
    if (!id) {
        throw new Error("Post ID is required");
    }

    try {
        console.log('Fetching post with ID:', id);
        console.log('Using URL:', `${API_SOCIAL_POSTS}/${id}`);
        console.log('Headers:', headers());

        const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
            method: 'GET',
            headers: headers()
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error Response:', errorData);
            throw new Error(`Failed to fetch post: ${response.status} - ${errorData.message || 'Unknown error'}`);
        }

        const data = await response.json();
        console.log('Post data received:', data);
        
        if (!data.data) {
            throw new Error('No post data found in response');
        }

        return data.data;
    } catch (error) {
        console.error('Error in readPost:', error);
        throw error;
    }
}

export async function readPosts(limit = 12, page = 1, tag) {
    try {
        const params = new URLSearchParams({
            limit: limit.toString(),
            page: page.toString(),
            _author: true,
        });

        if (tag) {
            params.append("tag", tag);
        }

        const url = `${API_SOCIAL_POSTS}?${params.toString()}`;

        const response = await fetch(url, {
            method: "GET",
            headers: headers(),
        });
        
        if (!response.ok) {
            throw new Error(`Error! Didn't manage to fetch posts: ${response.status}`);
        }
        
        const data = await response.json();
        const posts = data.data
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}

export async function readPostsByUser(name, limit = 12, page = 1, tag) {

    try {
        const params = new URLSearchParams({ 
            limit: limit.toString(),
            page: page.toString(),
            _author: true, 
        });

        if (tag) {
            params.append("tag", tag);
        }

        const url = `${API_SOCIAL_POSTS}?${params.toString()}`;

        const response = await fetch(url, {
            method: "GET",
            headers: headers(),
        });

        
        if (!response.ok) {
            throw new Error(`Error! Didn't manage to fetch posts: ${response.status}`);
        }
        
        const data = await response.json();
        const posts = data.data
        
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}