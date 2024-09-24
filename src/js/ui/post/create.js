import { createPost } from "../../api/post/create.js";

export async function onCreatePost(event) {
    event.preventDefault();

    const form = event.target;

    const title = form.title.value;
    const body = form.body.value;
    const tagsInput = form.tags.value;
    const media = form.media.value;

    const tags = tagsInput ? tagsInput.split(",").map(tag => tag.trim()) : [];
    const postData = { title, body, tags, media };

    try {
        const response = await createPost(postData);
        if (response.success) {
            alert("Post created successfully!");
        } else {
            alert("Failed to create post.");
        }
    } catch (error) {
        console.error("Error creating post:", error);
        alert("Error occurred while creating post.");
    }
}
