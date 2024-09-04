import { getCurrentUser } from "../utilities/currentUser.js";
import { API_AUTH_KEY } from "./constants.js";

export default class NoroffAPI {
  apiBase = "";

  constructor(apiBase = "https://v2.api.noroff.dev") {
    this.apiBase = apiBase;
  }

  get getCurrentUser() {
    return getCurrentUser();
  }
  get apiLoginPath() {
    return `${this.apiBase}/auth/login`;
  }

  get apiRegisterPath() {
    return `${this.apiBase}/auth/register`;
  }

  get apiPostPath() {
    return `${this.apiBase}/blog/posts/${this.user.name}`;
  }

  get apiSocialPath() {
    return `${this.apiBase}/social/posts`;
  }

  auth = {
    login: async ({ email, password }) => {
      const body = JSON.stringify({ email, password });

      const response = await fetch(this.apiLoginPath, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body,
      });

      if (response.ok) {
        const { data } = await response.json();
        const { accessToken: token, ...user } = data;
        localStorage.token = token;
        localStorage.user = JSON.stringify(user);
        router("/");
        return data;
      }
      throw new Error("Could not login with this account");
    },
    register: async ({ name, email, password }) => {
      const body = JSON.stringify({ name, email, password });

      const response = await fetch(this.apiRegisterPath, {
        headers: { "Content-Type": "application/json" },
        method: "post",
        body,
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      throw new Error("Could not register this account");
    },

    logout: async () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    },
  };

  post = {
    read: async (id) => {
      const { token, user } = getCurrentUser();

      const url = `${this.apiPostPath}/blog/posts/${user.name}/${id}`;

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }

      throw new Error("Could not create post");
    },
    update: async (id, { title, body, tags, media }) => {
      const { token, user } = getCurrentUser();

      const response = await fetch(API_BLOG_USER_POST(user.name, id), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "put",
        body: JSON.stringify({ title, body, tags, media }),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }

      throw new Error("Could not update post" + id);
    },
    delete: async (id) => {
      const { token } = getCurrentUser();

      const response = await fetch(`${this.apiPostPath}/${id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }

      throw new Error("Could not delete post" + id);
    },
    create: async ({ title, body, tags, media }) => {
      const { token } = this.getCurrentUser;

      const tagsArray = Array.isArray(tags) ? tags : tags.split (',').map (tag => tag.trim())

      const apiKeyData = await this.options.apiKey();
      
      const formattedMedia = {
        url: media || '',
        alt: media.alt || ''
      }
      const requestBody = {
        title,
        body,
        tags: tagsArray,
        media: formattedMedia
      };


      const response = await fetch(this.apiSocialPath, {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": `${apiKeyData.data.key}`
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }

      throw new Error("Could not create post");
    },
  };

  posts = {
    read: async (tag, limit = 12, page = 1) => {
      const user = getCurrentUser();
      const url = new URL(API_BLOG_USER_POST(user.name));
    },
  };

  getPosts = async () => {
    const { token } = this.getCurrentUser;

    const response = await fetch(`${this.apiSocialPath}`, {
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error("could not read the posts");
  };

  options = {
    apiKey: async () => {
      const { token } = this.getCurrentUser;

      const options = {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(`${API_AUTH_KEY}`, options);

      if (response.ok) {
        const data = await response.json();

        return data;

      } else {
        throw new Error("Failed to fetch options");
      }
    },
  };
}
