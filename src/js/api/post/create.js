import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

export async function createPost({ title, body, tags, media }) {
  const bodyElement = {
    title: title,
    body: body,
    tags: tags,
    media: media,
  };

  try {
    const response = await fetch(API_SOCIAL_POSTS, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(bodyElement),
    });
    console.log("Response:", response);

    console.log("inside headers:");
    headers().forEach((element) => {
      console.log(element);
    });

    if (response.ok) {
      alert("You created a post!");
      window.location.href = "/profile/";
    }
  } catch (error) {
    alert("Something went wrong trying to create a post!");
    console.log(error);
  }
}
