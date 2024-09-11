import { createPost } from "../../api/post/create";

export async function onCreatePost(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  console.log(event);

  const media = {
    url: formData.get("url"),
    alt: formData.get("alt"),
  };

  const createPostData = {
    title: formData.get("name"),
    body: formData.get("text"),
    tags: formData.get("tags").split(" "),
    media: media,
  };

  createPost(createPostData);
}
