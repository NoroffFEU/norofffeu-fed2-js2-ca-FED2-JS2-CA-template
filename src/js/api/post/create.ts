import { CreatePostRequest, APIError, PostResponse } from "@/types/types";
import { API_SOCIAL_POSTS } from "@api/constants";
import { headers } from "@api/headers";

export async function createPost({
  title,
  body,
  tags,
  media,
}: CreatePostRequest) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}`, {
      method: "POST",
      headers: headers(localStorage.token),
      body: JSON.stringify({
        title,
        body,
        tags,
        media,
      }),
    });

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message || "Something went wrong creating the post.";
      throw new Error(errorMessage);
    }
    const { data }: { data: PostResponse } = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
