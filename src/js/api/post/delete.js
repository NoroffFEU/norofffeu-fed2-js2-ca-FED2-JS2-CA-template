import { currentUser } from '../../utilities/currentUser.js';
import { API_SOCIAL_POSTS } from '../constants.js';
export async function deletePost(id) {
    const user = currentUser();

    const response = await fetch(API_SOCIAL_POSTS(id), {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    });

    if (response.ok) {
        return await response.text();
    }

    throw new Error("Couldn't delete post" + id);
}
