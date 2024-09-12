import { readPost } from "@/js/api/post/read";
import { authGuard } from "../../utilities/authGuard";

authGuard();

export async function fetchAndPopulateForm(editPostForm: HTMLFormElement) {
  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const titleInput = editPostForm.elements.namedItem(
    "title"
  ) as HTMLInputElement;
  const bodyInput = editPostForm.elements.namedItem("body") as HTMLInputElement;
  const tagsInput = editPostForm.elements.namedItem("tags") as HTMLInputElement;
  try {
    const post = await readPost(id);
    if (!post) return;
    titleInput.value = post.title;
    bodyInput.value = post.body;
    tagsInput.value = post.tags.join(", ");
  } catch (error) {
    console.error(error);
  }
}
