import { createPost as apiCreatePost } from "../../api/post/create.js";

export function populateCreatePostForm() {
    const form = document.forms.createPost;

    if (form.querySelector("input[name='title']")) {
        return;
    }

    const fields = [
        { name: "title", type: "text", placeholder: "Title", required: true },
        { name: "body", type: "textarea", placeholder: "Post Content", required: true },
        { name: "tags", type: "text", placeholder: "Tags (comma separated)" },
        { name: "media", type: "text", placeholder: "Media URL" },
    ];

    fields.forEach(field => {
        const label = document.createElement("label");
        label.textContent = field.placeholder;
        form.appendChild(label);

        let input;
        if (field.type === "textarea") {
            input = document.createElement("textarea");
        } else {
            input = document.createElement("input");
            input.type = field.type;
        }
        input.name = field.name;
        input.placeholder = field.placeholder;
        if (field.required) {
            input.required = true;
        }

        form.appendChild(input);
    });
}

export async function onCreatePost(event) {
    event.preventDefault();
    const form = event.target;

    // Collect input values
    const title = form.title.value;
    const body = form.body.value;
    const tags = form.tags.value.split(",").map(tag => tag.trim());
    const media = form.media.value;

    console.log("Post data:", { title, body, tags, media });

    try {
        const response = await apiCreatePost({ title, body, tags, media });

        if (response.ok) {
            const responseData = await response.json();
            console.log("Post created successfully!", responseData);
            form.reset();
        } else {
            const errorText = await response.text();
            console.error("Failed to create post:", response.status, errorText);
        }
    } catch (error) {
        console.error("Error creating post:", error);
    }
}

populateCreatePostForm();