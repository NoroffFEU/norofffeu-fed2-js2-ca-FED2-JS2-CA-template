import { API_SOCIAL_POSTS } from "../constants";
import { makeRequest } from "../makeRequest";

export async function postList() {
  try {
    const response = await makeRequest(API_SOCIAL_POSTS, "GET", null, true);
    console.log(response);
    return response; // Returns the posts if the request is successful
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return null;
  }
}
