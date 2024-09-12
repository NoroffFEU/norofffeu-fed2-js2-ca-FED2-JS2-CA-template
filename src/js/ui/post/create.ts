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

  //TODO add media

  try {
    await createPost({ title, body, tags });
    alert("Post created successfully!");
    window.location.href = `/home/`;
  } catch (error) {
    console.error(error);
  }
}
