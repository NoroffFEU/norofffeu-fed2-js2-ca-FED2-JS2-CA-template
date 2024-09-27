import { headers } from "../headers";
import { API_SOCIAL_POSTS } from "../constants";

/**
 * Fetches one single post from the API
 * @param {string} id - id of the single post
 * @returns {Promise} data - a single post
 * @example
 * ```js
 * readPost("709")
 * ```
 */
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

/**
 * Fetches {limit} most recent posts from the API
 * @param {number} limit  - limit of posts per page (set to 12 if nothing is send in)
 * @param {number} page - chooses with page (set to 1 if nothing is send in)
 * @returns {Promise} userPosts - most recent posts
 *
 * @example
 * ```js
 * readPosts(12, 1)
 * readPosts()
 * ```
 */
export async function readPosts(limit = 12, page = 1) {
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

/**
 * Fetches {limit} number of posts from a single user
 * @param {string} username - username of the chosen user
 * @param {number} limit  - limit of posts per page (set to 12 if nothing is send in)
 * @param {number} page - chooses with page (set to 1 if nothing is send in)
 * @returns
 * @example
 * ```js
 * readPostsByUser("Finn", 12, 1)
 * readPostsByUser("Finn")
 * ```
 */

export async function readPostsByUser(username, limit = 12, page = 1) {
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
