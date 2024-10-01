import {API_KEY, API_SOCIAL_POSTS} from "../constants.js"; // Import the API endpoint

export async function createPost({ title, body, tags, media }) {
    const postData = {
        title,
        body,
        tags,
        media : {url : media}
    };

    try {
        const response = await fetch(API_SOCIAL_POSTS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                "X-Noroff-API-Key": API_KEY,
            },
            body: JSON.stringify(postData),
        });

        return response;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
}
