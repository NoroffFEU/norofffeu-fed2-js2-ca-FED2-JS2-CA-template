import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

/**
 * This will send a DELETE fetch call to the API - deleting a post.
 * @param {string} id - id of the post that should be deleted
 * @example
 * ```js
 * deletePost("708")
 * ```
 */

export async function deletePost(id) {
  try {
    const response = await fetch(API_SOCIAL_POSTS + "/" + id, {
      method: "DELETE",
      headers: headers(),
    });
    if (response.ok) {
      alert("Post Deleted");
    }
  } catch (error) {
    alert("Something went wrong trying to delete post");
  }
}
