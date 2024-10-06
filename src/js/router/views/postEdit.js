import { authGuard } from "../../utilities/authGuard";

authGuard();


export async function editPost(postId, updatedData) {
    try {
        const response = await fetch(`${BASE_URL}/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your token
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('Failed to edit post');
        }

        return await response.json();
    } catch (error) {
        console.error('Error editing post:', error);
    }
}