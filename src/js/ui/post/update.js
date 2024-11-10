import { updatePost } from "../../api/post/update";

export async function onUpdatePost(event, postId) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const imageUrl = formData.get("image");
    const imageAlt = formData.get("alt");

    const updateData = {
        title: formData.get("title"),
        body: formData.get("body"),
        tags: formData.get("tags") ? formData.get("tags").split(',').map(tag => tag.trim()) : []
    };

    // Only include media if an image URL is provided
    if (imageUrl) {
        updateData.media = [{
            url: imageUrl,
            alt: imageAlt || ''
        }];
    }

    console.log("Update data:", updateData);

    try {
        const result = await updatePost(postId, updateData);
        alert('Post successfully updated');
        window.location.href = `/post/?id=${postId}`;
    } catch (error) {
        console.error("Update error:", error);
        alert(`Failed to update post: ${error.message}`);
    }
}