import { APIError, PostResponse, SearchPostsResponse } from "@/types/types";
import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

export async function searchPosts(query: string) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/search?q=${query}`, {
      method: "GET",
      headers: headers(localStorage.token),
    });

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
