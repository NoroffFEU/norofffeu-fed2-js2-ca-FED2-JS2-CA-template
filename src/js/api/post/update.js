import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

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
    console.log("Response:", response);

    console.log("inside headers:");
    headers().forEach((element) => {
      console.log(element);
    });

    if (response.ok) {
      alert("You updated the post!");
      window.location.href = "/";
    }
  } catch (error) {
    alert("Something went wrong trying to update the post!");
    console.log(error);
  }
}
