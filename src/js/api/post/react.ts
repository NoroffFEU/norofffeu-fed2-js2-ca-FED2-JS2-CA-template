import { APIError, ReactionResponse } from "@/types/types";
import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

export async function reactToPost(id: number, symbol: string) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}/react/${symbol}`, {
      method: "PUT",
      headers: headers(localStorage.token),
      body: JSON.stringify({
        symbol,
      }),
    });

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message || "Something went wrong reacting to the post.";
      throw new Error(errorMessage);
    }

    const { data }: { data?: ReactionResponse } = await response.json();
    if (!data || !data.reactions || data.reactions.length === 0) {
      console.log("No data");
      return;
    } else {
      console.log(data.postId, data.reactions, data.reactions[0].reactors[0]);
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}
