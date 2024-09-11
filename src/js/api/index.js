import { API_BASE } from "./constants";
import { headers } from "./headers";

export default class NoroffAPI {
  
  static get user() {
    try{
      return JSON.parse(localStorage.getItem("user")).name;
    } catch(error) {
      return null;
    }
  }
  
  static apiBase = API_BASE;
  // static loginPath = `${NoroffAPI.apiBase}/auth/login`;
  // static registerPath = `${NoroffAPI.apiBase}/auth/register`;
  // static socialPostPath = `${NoroffAPI.apiBase}/social/posts`;

  static paths = {
    base: API_BASE,
    login: `${NoroffAPI.apiBase}/auth/login`,
    register: `${NoroffAPI.apiBase}/auth/register`,
    socialPost: `${NoroffAPI.apiBase}/social/posts`,
  }

  auth = {
    login: async ({ email, password }) => {
      const body = JSON.stringify({ email, password });
  
      const response = await fetch(NoroffAPI.paths.login, {
        headers: headers(true),
        method: "POST",
        body,
      });

      const { data } = await NoroffAPI.util.handleResponse(response, "Could not login this account");
      const { accessToken: token, ...user } = data;
      localStorage.token = token;
      localStorage.user = JSON.stringify(user);
      window.location.href = "/post/feed/";
      return data;
    },

    register: async ({ name, email, password }) => {
      const body = JSON.stringify({ name, email, password });
  
      const response = await fetch(NoroffAPI.paths.register, {
        headers: headers(true),
        method: "POST",
        body,
      });

      const data = await NoroffAPI.util.handleResponse(response, "Could not register this account");
      return data;
    },
  }

  static util = {
    handleResponse: async (response, errorMessage, output = "json") => {
      if (response.ok) {
        return await response[output]();
      }

      const errorData = await response[output]();
      const errorDetail = errorData.errors[0]?.message || "Unknown error";

      throw new Error(`${errorMessage}: ${errorDetail}`);
    },

    handleRequest: async (url, options, output = "json") => {
      const response = await fetch(url, {
        ...options,
        headers: headers(true),
      });
    }
  }

  post = {
    create: async ({ title, body: content, tags, media }) => {
      const body = JSON.stringify({ title, body: content, tags, media });

      const response = await fetch(NoroffAPI.paths.socialPost, {
        headers: headers(true),
        method: "POST",
        body,
      });

      const data = await NoroffAPI.util.handleResponse(response, "Could not create post");
      window.location.href = "/post/feed/";
      return data;
    },

    delete: async (id) => {},

    readPost: async (id, tag = null) => {
      const url = new URL(`${NoroffAPI.paths.socialPost}/${id}`);
      url.searchParams.append("_author", true);
      url.searchParams.append("_comments", true);
      if(tag) {
        url.searchParams.append("_tag", tag);
      }

      const response = await fetch(url.toString(), {
        headers: headers(),
        method: "GET"
      });

      const data = await NoroffAPI.util.handleResponse(response, "Could not get the post");
      return data
    },

    update: async (id, { title, body, tags, media }) => {},
  }

  posts = {
    getPosts: async (limit = 12, page = 1, tag) => {
      const url = new URL(NoroffAPI.paths.socialPost);  
      url.searchParams.append("limit", limit);
      url.searchParams.append("page", page);
      url.searchParams.append("_author", true);
      url.searchParams.append("_comments", true);
      if(tag) {
        url.searchParams.append("_tag", tag);
      }

      const response = await fetch(url.toString(), {
        headers: headers(),
        method: "GET"
      });

      const data = await NoroffAPI.util.handleResponse(response, "Could not get posts");
      return data;
    },

    readPostsByUser: async () => {},
  }
}