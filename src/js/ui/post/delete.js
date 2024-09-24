import { deletePost } from "../../api/post/delete";

export async function onDeletePost(event) {
  const id = event.target.id;
  console.log("blob", id);

  await deletePost(id);

  window.location.href = "/";
}
