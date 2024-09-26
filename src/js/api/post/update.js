import { API_BASE } from "../constants.js";
import { headers } from "../headers.js";

export async function updatePost(id, postData) {
    console.log("Updating post with ID:", id);
    console.log("Sending post data:", postData);

    const response = await fetch(`${API_BASE}/social/posts/${id}`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(postData)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error response:", errorData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
}