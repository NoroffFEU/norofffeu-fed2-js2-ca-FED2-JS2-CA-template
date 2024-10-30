import { deletePost } from "../../api/post/delete";

/**
 * Deletes selected posts
 * @param {object} event
 * @example
 * ```js
 * button.addEventListener("click", onDeletePost)
 * ```
 */
export async function onDeletePost(event) {
  const id = event.target.id;
  console.log("id:", id);

  await deletePost(id);

  location.reload();
}
