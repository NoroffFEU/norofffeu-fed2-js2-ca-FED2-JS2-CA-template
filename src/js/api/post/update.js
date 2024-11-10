import { API_SOCIAL_POSTS } from "../constants"
import { headers } from "../headers"

export async function updatePost(id, postData) {
    if (!id) {
        throw new Error("Post ID is required");
    }

    const requestBody = {
        title: postData.title,
        body: postData.body,
        tags: postData.tags,
        media: postData.media
    };

    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
            method: 'PUT',
            headers: headers(),
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.errors?.[0]?.message || 'Failed to update post');
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Update error:', error);
        throw error;
    }
}