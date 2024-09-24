import { updatePost } from "../../api/post/update";

export async function onUpdatePost(event) {
  event.preventDefault();
  const id = JSON.parse(localStorage.getItem("postID"));

  const formData = new FormData(event.target);

  const media = {
    url: formData.get("url"),
    alt: formData.get("alt"),
  };

  const EditPostData = {
    title: formData.get("title"),
    body: formData.get("text"),
    tags: formData.get("tags").split(" "),
    media: media,
  };

  updatePost(id, EditPostData);
}
