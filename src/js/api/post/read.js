import { headers } from "../headers";
import { API_SOCIAL_POSTS } from "../constants";

export async function readPost(id) {
  const queryParameters = `?&_author=true&_reactions=true&_comments=true`;
  try {
    const response = await fetch(
      API_SOCIAL_POSTS + "/" + id + queryParameters,
      {
        method: "GET",
        headers: headers(),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const post = data.data;
      console.log("single post:", post);
      return post;
    }
  } catch (error) {
    alert("something went wrong trying to fetch the post");
    console.log("error:", error);
  }
}

export async function readPosts(limit = 12, page = 1, tag) {
  const queryParameters = `?limit=${limit}&page=${page}&_author=true&_reactions=true&_comments=true`;
  try {
    const response = await fetch(API_SOCIAL_POSTS + queryParameters, {
      method: "GET",
      headers: headers(),
    });

    if (response.ok) {
      const data = await response.json();

      const userPosts = data.data;

      return userPosts;
    }
  } catch (error) {
    console.log(error);
    alert("something went wrong trying to fetch user posts");
  }
}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {
  const queryParameters = `?limit=${limit}&page=${page}&_author=true&_reactions=true&_comments=true`;
  try {
    const response = await fetch(API_SOCIAL_POSTS + queryParameters, {
      method: "GET",
      headers: headers(),
    });

    if (response.ok) {
      const data = await response.json();

      const userPosts = data.data;

      console.log(userPosts);
      const test = userPosts.filter((post) => {
        return post.author.name === username;
      });

      console.log("test:", test);

      return test;
    }
  } catch (error) {
    console.log(error);
    alert("something went wrong trying to fetch user posts");
  }
}
