import { createPost } from "../../api/post/create";

/**
 * gets the form data - and sends in the data to create a post.
 * @param {object} event
 * @example
 * ```js
 * form.addEventListener("submit", onCreatePost)
 * ```
 */
export async function onCreatePost(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const media = {
    url: formData.get("url"),
    alt: formData.get("alt"),
  };

  const createPostData = {
    title: formData.get("title"),
    body: formData.get("text"),
    tags: formData.get("tags").split(" "),
    media: media,
  };

  createPost(createPostData);
}
