import { updatePost } from "../../api/post/update";
export async function onUpdatePost(event) {
  // ui/post/create.js

  event.preventDefault(); // Prevent form from reloading the page

  const form = event.target;
  const title = form.title.value;
  const body = form.content.value; // Ensure content is body
  const mediaUrl = form.url.value;

  // Assuming tags are left empty for now
  const tags = [];
  const media = {
    url: mediaUrl,
    alt: "User-provided image", // Optionally you can update this to something dynamic
  };

  try {
    await createPost({ title, body, tags, media });
    alert("Post created successfully!");
    form.reset(); // Reset form after successful post creation
  } catch (error) {
    console.error("Error creating post:", error);
    alert("Failed to create post.");
  }
}
