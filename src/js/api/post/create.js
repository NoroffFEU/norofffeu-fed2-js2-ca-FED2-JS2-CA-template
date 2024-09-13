import { currentUser } from '../../utilities/currentUser';
import { API_SOCIAL_POSTS } from '../constants.js';
export async function createPost({ title, body, tags, media }) {
    const user = currentUser();

    const response = await fetch(API_SOCIAL_POSTS(user.name), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ title, body, tags, media }),
    });

    if (response.ok) {
        const { data } = await response.json();
        return data;
    }

    throw new Error("Couldn't create post");
}
