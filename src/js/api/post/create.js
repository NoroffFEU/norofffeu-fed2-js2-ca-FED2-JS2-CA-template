import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

/**
 * Makes a POST call to the API - creating a post
 * @param {object} postInfo - object with the post info in it (title, body, tags, media)
 * @param {string} postInfo.title - a string that is the title of the post.
 * @param {string} postInfo.body - a string of text that is the body of the post.
 * @param {Array} postInfo.tags - an array with strings, that are the tags of the post.
 * @param {object} postInfo.media - an object that includes url: "string", alt: "string".
 * @example
 * ```js
 * createPost({"PostTitle", "This is some text for the post", ["tagOne", "tagTwo"], {url: "SomeImageUrl", alt: "Some Image Text"}})
 * ```
 */

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
