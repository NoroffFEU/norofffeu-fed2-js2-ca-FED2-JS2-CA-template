export async function updatePost(postId, updatedData, token) {
    try {
        const response = await fetch(`${BASE_URL}/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the user's access token
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('Failed to update post');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating post:', error);
        throw error; // Re-throw the error for handling in the component
    }
}
const BASE_URL = 'https://v2.api.noroff.dev/posts';
 