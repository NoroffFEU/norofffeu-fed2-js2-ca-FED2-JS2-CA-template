import { PostID, APIError, PostResponse } from "@/types/types";
import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "@api/headers";

export async function readPost(id: PostID) {
  try {
    const response = await fetch(
      `${API_SOCIAL_POSTS}/${id}?_author=true&_comments=true&_reactions=true`,
      {
        headers: headers(localStorage.token),
      }
    );

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message || "Something went wrong reading the post.";
      throw new Error(errorMessage);
    }

    const { data }: { data: PostResponse } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function readPosts(limit = 12, page = 1, tag) {}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {}
