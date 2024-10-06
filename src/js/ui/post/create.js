import { createPost } from "../../api/post/create";

export async function onCreatePost(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const post = Object.fromEntries(formData.entries());
  
    post.tags = post.tags ? post.tags.split(",").map((tag) => tag.trim()) : [];
  
    if (post["media-url"]) {
      post.media = {
        url: post["media-url"],
        alt: post["media-alt"] || "No description provided",
      };
    } else {
      post.media = null;
    }
  
    if (!post.title) {
      alert("Title is required for creating a post");
      return;
    }
  
    try {
      const response = await createPost(post);
      alert("Post created!");
      form.reset();
    } catch (error) {
      console.error("Error creating post: ", error);
      alert("Failed to create post. Please try again.");
    }
  
}
