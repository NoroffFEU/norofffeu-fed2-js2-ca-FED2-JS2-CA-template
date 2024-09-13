import { currentUser } from '../../utilities/currentUser.js';
import { API_SOCIAL_POSTS } from '../constants.js';

export async function readPost(id) {
    const user = currentUser();

    const response = await fetch(API_SOCIAL_POSTS(id), {
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        },
    });

    if (response.ok) {
        const { data } = await response.json();
        return data;
    }

    throw new Error("Couldn't read post" + id);
}

export async function readPosts(limit = 12, page = 1, tag) {
    const response = await fetch(API_SOCIAL_POSTS(limit, page, tag), {
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        },
    });

    if (response.ok) {
        const { data } = await response.json();
        return data;
    }

    throw new Error("Couldn't read posts");
}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {}
