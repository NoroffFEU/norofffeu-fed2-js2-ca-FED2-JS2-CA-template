import { API_SOCIAL_POSTS } from "../constants"
import { headers } from "../headers"

export async function updatePost(id, { title, body, tags, media }) {
    if (!id) {
        throw new Error("Post ID is required for updating");
    }

    const url = `${API_SOCIAL_POSTS}/${id}`;
    const requestBody = { title, body, tags };
    
    // Only include media if it's provided and has a valid URL
    if (media && media.length > 0 && media[0].url) {
        requestBody.media = media;
    }
    
    console.log("Update URL:", url);
    console.log("Request body:", JSON.stringify(requestBody, null, 2));
    console.log("Request headers:", headers());

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: headers(),
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        console.log("Response status:", response.status);
        console.log("Response data:", data);

        if (!response.ok) {
            const errorMessage = data.errors?.[0]?.message || data.message || 'Failed to update post';
            throw new Error(errorMessage);
        }

        return data;
    } catch (error) {
        console.error('Failed to update the post:', error);
        throw error;
    }
}