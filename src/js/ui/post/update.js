import { updatePost } from "../../api/post/update";
import { readPost } from "../../api/post/read";
import { load } from "../../api/auth/key";


export async function onUpdatePost(event) {
    event.preventDefault();

  const form = document.forms.editPost;
  const id = JSON.parse(localStorage.getItem("postID"));
  const formData = new FormData(event.target);

  const existingPost = await readPost(id);

  const updatedData = {
    title: formData.get("title") || existingPost.title,
    body: formData.get("body") || existingPost.body,
    tags: formData.get("tags")
      ? formData
          .get("tags")
          .split(",")
          .map((tag) => tag.trim()) // Splits and trims tags into an array
      : existingPost.tags,
  };

  const mediaUrl = formData.get("media-url")?.trim();
  const mediaAlt = formData.get("media-alt")?.trim();

  if (mediaUrl || existingPost.media?.url) {
    updatedData.media = {
      url: mediaUrl || existingPost.media?.url || null,
      alt: mediaAlt || existingPost.media?.alt || "",
    };
  }

  // Check if media URL is provided and valid
  if (updatedData.media?.url && !isValidURL(updatedData.media.url)) {
    alert("Please provide a valid URL for the media.");
    return; 
  }

  try {
    await updatePost(id, updatedData);
    alert("Post updated successfully!");
    window.location.href = `/post/`;
  } catch (error) {
    console.error("Failed to update the post:", error);
    alert("Failed to update the post.");
  }
}

// Utility function to check if a string is a valid URL
function isValidURL(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }
  return true;
}

export const onEditButton = (post, author) => {
  const user = load("user");
  const userName = user.name;

  if (author === userName) {
    const editButton = document.createElement("a");
    editButton.innerText = "Edit post";
    editButton.setAttribute("href", `/post/edit/?id=${post.id}`);
    editButton.setAttribute("id", "edit-link");
    editButton.classList.add("button");

    editButton.addEventListener("click", () => {
      localStorage.setItem("postID", JSON.stringify(post.id));
      window.location.href = editButton.getAttribute("href");
    });

    return editButton;
  } else {
    return "";
  }
};


