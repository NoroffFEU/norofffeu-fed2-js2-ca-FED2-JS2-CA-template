import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

/**
 *
 * @param {string} id - id of the posts that will be updated
 * @param {object} postInfo - object, that contains the post info {title, body, tags, media}
 * @param {string} postInfo.title - title of the post
 * @param {string} postInfo.body - text of the post
 * @param {Array} postInfo.tags - array of strings with the tags of the posts - ["tagOne", "tagTwo"]
 * @param {object} postInfo.media  - object with image information in it - {url: "string", alt: "string"}
 * @example
 * ```js
 * updatePost("709", {"Title", "Text of post", ["tagOne", "TagTwo"], {url: "string", alt: "string"}})
 * ```
 */

export async function updatePost(id, { title, body, tags, media }) {
  const bodyElement = {
    title: title,
    body: body,
    tags: tags,
    media: media,
  };

  try {
    const response = await fetch(API_SOCIAL_POSTS + "/" + id, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(bodyElement),
    });

    if (response.ok) {
      alert("You updated the post!");
      window.location.href = "/";
    }
  } catch (error) {
    alert("Something went wrong trying to update the post!");
  }
}
