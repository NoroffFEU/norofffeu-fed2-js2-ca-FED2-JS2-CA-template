const BASE_URL = 'https://v2.api.noroff.dev/posts';

export async function deletePost(postId, token) {
    try {
        const response = await fetch(`${BASE_URL}/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, // Include the user's access token
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete post');
        }

        return true; 
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error; 
    }
}

