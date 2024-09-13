import { currentUser } from '../../utilities/currentUser.js';
import { API_SOCIAL_POSTS } from '../constants.js';

export async function updatePost(id, { title, body, tags, media }) {
    const user = currentUser();

    const response = await fetch(API_SOCIAL_POSTS(id), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify({ title, body, tags, media }),
    });

    if (response.ok) {
        const { data } = await response.json();
        return data;
    }

    throw new Error("Couldn't update post" + id);
}
