import { updatePost } from "@api/post/update";

export async function onUpdatePost(event: Event) {
  event.preventDefault();
  const postToUpdate = Number(
    new URL(window.location.href).searchParams.get("id")
  );
  console.log(postToUpdate);
}
