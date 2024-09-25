import { getId } from "@/js/utilities/getId";
import { updatePost } from "@api/post/update";
import { uploadImage } from "@/js/api/imgur/imgur";

export async function onUpdatePost(event: Event) {
  event.preventDefault();

  const postToUpdate = getId();

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
    await updatePost(postToUpdate, { title, body, tags, media });
    alert("Post updated successfully!");
    window.location.href = `/home/`;
  } catch (error) {
    console.error(error);
    alert("There was an issue updating the post. Please try again.");
  }
}
