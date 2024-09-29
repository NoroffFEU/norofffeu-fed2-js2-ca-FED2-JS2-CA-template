import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

export async function readPost() {
    
    const id = new URLSearchParams(window.location.search).get("id");

     try {
         const response = await fetch(`${API_SOCIAL_POSTS}/${id}?_author=true`, {
             method: "GET",
             headers: headers(),
         });

         if (response.ok) {
             const data = await response.json();
             const post = data.data
             return post; 
         } else {
             console.error("Failed to fetch post:", response.status, response.statusText);
             return null; 
         }
     } catch (error) {
         console.error("An error occurred while fetching the post:", error);
         return null; 
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