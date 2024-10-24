import { postService } from "../../api/index";

export async function onUpdatePost(postId, event) {
  event.preventDefault();

  const form = document.forms["editPost"];

  if (!form) {
    console.error("Form element not found");
    return;
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  data.tags = data.tags.split(",").map((tag) => tag.trim());

  const payload = {
    title: data.title,
    body: data.body,
    tags: data.tags,
    media: {
      url: data.media,
      alt: "",
    },
  };

  console.log("payload", payload)

  try {
    const result = await postService.update(postId, payload);

    if (result) {
      console.log("Post updated successfully:", result);
      alert("Post updated successfully!"); // Notify the user
      window.location.href = "/";
    }else {
        console.error('Failed to update post:', result.message);
        alert('Failed to update post. Please try again.');
      }
  } catch (error) {
    console.error('Error updating post:', error);
    alert('An error occurred while updating the post.');
  }
}
