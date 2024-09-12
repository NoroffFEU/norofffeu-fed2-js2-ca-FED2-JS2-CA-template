import { updatePost } from "@api/post/update";
import { findForm } from "@utilities/findForm";
import { getInput } from "@utilities/getInput";

export async function onUpdatePost(event: Event) {
  event.preventDefault();

  const postToUpdate = Number(
    new URL(window.location.href).searchParams.get("id")
  );

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const userData = Object.fromEntries(formData);

  const title = userData.title as string;
  const body = userData.body as string;
  const tags =
    (userData.tags as string)?.split(",").map((tag) => tag.trim()) || [];

  //TODO add media

  try {
    await updatePost(postToUpdate, { title, body, tags });
    alert("Post updated successfully!");
    window.location.href = `/home/`;
  } catch (error) {
    console.error(error);
  }
}
