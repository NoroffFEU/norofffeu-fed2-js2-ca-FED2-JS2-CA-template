import { PostID, APIError, PostResponse } from "@/types/types";
import { API_SOCIAL_POSTS } from "@api/constants";
import { headers } from "@api/headers";

export async function deletePost(id: PostID) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: "DELETE",
      headers: headers(localStorage.token),
    });

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message ||
        `Something went wrong deleting the post with id: ${id}.`;
      throw new Error(errorMessage);
    }
    return response.ok;
  } catch (error) {
    console.error(error);
  }
}
