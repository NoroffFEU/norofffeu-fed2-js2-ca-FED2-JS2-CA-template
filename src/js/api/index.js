

export default class NoroffAPI {
  static apiBase = "https://v2.api.noroff.dev";

  static loginPath = `${NoroffAPI.apiBase}/auth/login`;

  static registerPath = `${NoroffAPI.apiBase}/auth/register`;

  static postPath = (name) => `${NoroffAPI.apiBase}/social/posts/${name}`;
  
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
        headers: NoroffAPI.util.setupHeaders(true),
        body,
      });

      if (response.ok) {
        const { data } = await NoroffAPI.util.handleResponse(response);
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
        const { data } = await NoroffAPI.util.handleResponse(response);
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

  static util = {
    setupHeaders: (body) => {
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
    },
    handleRequest: async (request, output = 'json') => {
        const response = await fetch(request.url, {
          method: request.method,
          headers: NoroffAPI.util.setupHeaders(request.body),
          body: request.body? JSON.stringify(request.body) : null,
        });
        return NoroffAPI.util.handleResponse(response, output);
    }
  }

  post = {
    read: async (id) => {
        const { data } = await NoroffAPI.util.handleRequest(`${this.apiPostPath}/${id}`)
        return data
    },
    update: async (id,{ title, body, tags, media}) => {
        const data = await NoroffAPI.util.handleRequest(`${this.apiPostPath}/${id}`, {
          method: "PUT",
          body: JSON.stringify({ title, body, tags, media }),
        });
        return data
    },
    delete: async (id) => {
        await NoroffAPI.util.handleRequest(`${this.apiPostPath}/${id}`, 'text')
    },
    create: async ({ title, body, tags, media }) => {
        const data = await NoroffAPI.util.handleRequest(`${this.apiPostPath}`, {
            method: "POST",
            body: JSON.stringify({ title, body, tags, media }),
          });
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
