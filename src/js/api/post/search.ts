import { APIError, Params, SearchPostsResponse } from "@/types/types";
import { API_SOCIAL } from "@api/constants";
import { headers } from "@api/headers";

export async function searchPosts(
  query: string,
  { limit = 12, page = 1 }: Params = {}
) {
  try {
    const response = await fetch(
      `${API_SOCIAL.POSTS}/search?q=${query}&limit=${limit}&page=${page}`,
      {
        method: "GET",
        headers: headers(localStorage.token),
      }
    );

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message || "Something went wrong searching the posts.";
      throw new Error(errorMessage);
    }

    const { data }: { data: SearchPostsResponse[] } = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
