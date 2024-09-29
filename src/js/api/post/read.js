// src/js/api/post/read.js

import { currentUser } from '../../utilities/currentUser.js';
import { API_SOCIAL_POSTS } from '../constants.js';
import { headers } from '../../api/headers.js';

export async function readPost(id) {
    const user = currentUser();

    const response = await fetch(API_SOCIAL_POSTS(id), {
        method: 'GET',
        headers: headers(true),
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const { data } = await response.json();
        return data;
    }

    throw new Error("Couldn't read post" + id);
}

export async function readPosts(limit = 12, page = 1, tag) {
    const response = await fetch(API_SOCIAL_POSTS(limit, page, tag), {
        method: 'GET',
        headers: headers(true),
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const { data } = await response.json();
        return data;
    }

    throw new Error("Couldn't read posts");
}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {
    const response = await fetch(API_SOCIAL_POSTS_USER(username, limit, page, tag), {
        method: 'GET',
        headers: headers(true),
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const { data } = await response.json();
        return data;
    }

    throw new Error("Couldn't read posts by user");
}
