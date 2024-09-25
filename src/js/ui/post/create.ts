import { uploadImage } from "@/js/api/imgur/imgur";
import { createPost } from "@api/post/create";

export async function onCreatePost(event: Event) {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const userData = Object.fromEntries(formData);

  const title = userData.title as string;
  const body = userData.body as string;
  const tags =
    (userData.tags as string)?.split(",").map((tag) => tag.trim()) || [];

  const mediaInput = form.elements.namedItem("media") as HTMLInputElement;

  let media: { url: string; alt: string } | undefined = undefined;

  if (mediaInput.files && mediaInput.files.length > 0) {
    const file = mediaInput.files[0];
    try {
      const mediaUrl = await uploadImage(file);
      const altText = `Image for post titled: ${title}`;
      media = { url: mediaUrl, alt: altText };
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("There was an issue uploading the image. Please try again.");
      return;
    }
  }

  try {
    await createPost({
      title,
      body,
      tags,
      media,
    });
    alert("Post created successfully!");
    window.location.assign("/home/");
  } catch (error) {
    console.error("Error creating post:", error);
    alert("There was an issue creating the post. Please try again.");
  }
}
