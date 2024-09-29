// src/js/api/post/delete.js

import { currentUser } from '../../utilities/currentUser.js';
import { headers } from './headers.js';
import { API_SOCIAL_POSTS } from './constants.js';

export async function deletePost(id) {
    const user = currentUser();

    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
        method: 'DELETE',
        headers: headers(),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Post deletion failed");
    }

    return true;
}