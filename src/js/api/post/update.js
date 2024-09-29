// src/js/api/post/update.js

import { currentUser } from '/src/js/utilities/currentUser.js';
import { headers } from '/src/js/api/headers.js';
import { API_SOCIAL_POSTS } from '/src/js/api/constants.js';

export async function editPost(id, { title, body, tags, media}) {
    const user = currentUser();

    const data = { title, body, tags, media };
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
        method: 'PUT',
        headers: headers(true),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Post update failed");
    }

    return await response.json();
}