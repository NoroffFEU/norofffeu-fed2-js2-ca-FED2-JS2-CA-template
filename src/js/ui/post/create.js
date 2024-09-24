// export async function onCreatePost(event) {}

// src/ui/post/create.js
import { createPost as apiCreatePost } from "../../api/post/create.js"; // Import API function

// Function to dynamically populate the create post form
export function populateCreatePostForm() {
    const form = document.forms.createPost; // Get the form element

    // Create input fields and labels
    const fields = [
        { name: "title", type: "text", placeholder: "Title", required: true },
        { name: "body", type: "textarea", placeholder: "Post Content", required: true },
        { name: "tags", type: "text", placeholder: "Tags (comma separated)" },
        { name: "media", type: "text", placeholder: "Media URL" },
    ];

    fields.forEach(field => {
        const label = document.createElement("label");
        label.textContent = field.placeholder; // Set label text
        form.appendChild(label); // Append label to form

        let input;
        if (field.type === "textarea") {
            input = document.createElement("textarea");
        } else {
            input = document.createElement("input");
            input.type = field.type; // Set input type
        }
        input.name = field.name; // Set input name
        input.placeholder = field.placeholder; // Set input placeholder
        if (field.required) {
            input.required = true; // Set required attribute if needed
        }

        form.appendChild(input); // Append input to form
    });
}

// Function to handle form submission
export async function onCreatePost(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const form = event.target; // Get the form that triggered the event

    // Collect input values
    const title = form.title.value;
    const body = form.body.value;
    const tags = form.tags.value.split(",").map(tag => tag.trim()); // Split tags into an array
    const media = form.media.value; // Get media URL

    // Call the API function to create the post
    const response = await apiCreatePost({ title, body, tags, media });

    // Handle the response (display success/error messages, etc.)
    if (response.ok) {
        console.log("Post created successfully!");
        form.reset(); // Reset form after successful submission
    } else {
        console.error("Failed to create post:", response.statusText);
    }
}

// Populate the form when this module is loaded
populateCreatePostForm();