import { currentUser } from "../utilities/currentUser.js";

export default class NoroffAPI {
  static apiBase = "https://v2.api.noroff.dev";

  static loginPath = '$(NoroffAPI.apiBase).login';

  static registerPath = '$(NoroffAPI.apiBase).register';

  static postPath = (name) => '$(NoroffAPI.apiBase)/social/posts/${name}';
  
  get apiPostPath() {
    return NoroffAPI.postPath(this.user.name);
  }

  get user() {
    try {
        return JSON.parse(localStorage.user);
    } catch {
        return null;
    }
  }

  auth = {
    /**
     *  @param {Object} user - The login parameters.
     *  @param {String} user.email - The email of the user.
     *  @param {String} user.password - The password of the user.
     *  @returns {Promise<Object>} The logged-in user data.
     */

    login: async ({ email, password }) => {
      const body = JSON.stringify({ email, password });

      const response = await fetch(NoroffAPI.loginPath, {
        method: "POST",
        headers: this.util.setupHeaders(true),
        body,
      });

      if (response.ok) {
        const { data } = await this.util.handleResponse(response);
        const { accessToken: token, ...user } = data;
        localStorage.token = token;
        localStorage.user = JSON.stringify(user);
        return user;
      }

      throw new Error("Couldn't login");
    },

    register: async ({ email, password, name }) => {
      const body = JSON.stringify({ email, password, name });

      const response = await fetch(NoroffAPI.registerPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (response.ok) {
        const { data } = await this.util.handleResponse(response);
        const { accessToken: token, ...user } = data;
        localStorage.token = token;
        localStorage.user = JSON.stringify(user);
        return data;
      }

      throw new Error("Couldn't register");
    },

    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
    },
  };

  util = {
    setupHeaders: () => {
        const headers = new Headers();
        if (localStorage.token) {
          headers.append("Authorization", `Bearer ${localStorage.token}`);
        }

        if (body) {
            headers.append("Content-Type", "application/json");
        }
        return headers;
    },
    handleResponse: async (response, output = 'json') => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (output === 'json') {
            return await response.json();
        } else {
            return response;
        }
    }
  }

  post = {
    read: async (id) => {
        const response = await fetch(`${apiPostPath}/${id}`, {
          headers: this.util.setupHeaders(),
        });
        const {data} = await this.util.handleResponse(response)
        return data
    },
    update: async (id,{ title, body, tags, media}) => {
        const response = await fetch(`${apiPostPath}/${id}`, {
          method: "PUT",
          headers: this.util.setupHeaders(),
          body: JSON.stringify({ title, body, tags, media }),
        });
        const {data} = await this.util.handleResponse(response)
        return data
    },
    delete: async (id) => {
        const response = await fetch(`${apiPostPath}/${id}`, {
          method: "DELETE",
          headers: this.util.setupHeaders(),
        });

        const text = this.util.handleResponse(response, 'text')
        return text
    },
    create: async ({ title, body, tags, media }) => {
        const response = await fetch(apiPostPath, {
          method: "POST",
          headers: this.util.setupHeaders(),
          body: JSON.stringify({ title, body, tags, media }),
        });
        const {data} = await this.util.handleResponse(response)
        return data
    }
  }

  posts = {
    read: async (page = 1, limit = 12, tag) => {
        const response = await fetch(`${apiPostPath}?page=${page}&limit=${limit}&tag=${tag}`, {
          headers: this.util.setupHeaders(),
        });
        const {data} = await this.util.handleResponse(response)
        return data
    },
    create: async ({ title, body, tags, media }) => {
        const response = await fetch(apiPostPath, {
          method: "POST",
          headers: this.util.setupHeaders(),
          body: JSON.stringify({ title, body, tags, media }),
        });
        const {data} = await this.util.handleResponse(response)
        return data
    }
  }
}
