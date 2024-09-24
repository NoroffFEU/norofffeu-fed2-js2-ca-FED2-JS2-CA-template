

export default class NoroffAPI {

  get user() {
    try {
        return JSON.parse(localStorage.user);
    } catch {
        return null;
    }
  }

  set user(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  get token() {
    return localStorage.token;
  }

  set token(accessToken) {
    localStorage.setItem('token', accessToken);
  }

 
  static paths = {
    base: "https://v2.api.noroff.dev",
    login: `${NoroffAPI.apiBase}/auth/login`,
    register: `${NoroffAPI.apiBase}/auth/register`,
    posts: (name) => `${NoroffAPI.apiBase}/social/posts/${name}`,
    post: (name, id) => `${NoroffAPI.postsPath(name)}/social/post/${name}/${id}`,
    createPost: (name) => `${NoroffAPI.postsPath(name)}`,
    updatePost: (name, id) => `${NoroffAPI.postPath(name, id)}`,
    deletePost: (name, id) => `${NoroffAPI.postPath(name, id)}`,
  }

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

  auth = {
    /**
     *  @param {Object} user - The login parameters.
     *  @param {String} user.email - The email of the user.
     *  @param {String} user.password - The password of the user.
     *  @returns {Promise<Object>} The logged-in user data.
     */

    login: async ({ email, password }) => {
      const body = JSON.stringify({ email, password });

      const response = await fetch(NoroffAPI.paths.login, {
        method: "POST",
        headers: NoroffAPI.util.setupHeaders(true),
        body,
      });

      if (response.ok) {
        const { data } = await NoroffAPI.util.handleResponse(response);
        const { accessToken: token, ...user } = data;
        
        this.user = user;
        this.token = token;

        return user;
      }

      throw new Error("Couldn't login");
    },

    register: async ({ email, password, name }) => {
      const body = JSON.stringify({ email, password, name });

      const response = await fetch(NoroffAPI.paths.register, {
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
      this.user = null;
      this.token = null;
     
      window.location.href = "/auth/login.html";
    },
  };

    post = {
    read: async (id) => {
        const { data } = await NoroffAPI.util.handleRequest(NoroffAPI.paths.post(this.user.name, id));
        return data
    },
    update: async (id,{ title, body, tags, media}) => {
        const data = await NoroffAPI.util.handleRequest(NoroffAPI.paths.post(this.user.name, id), {
          method: "PUT",
          body: JSON.stringify({ title, body, tags, media }),
        });
        return data
    },
    delete: async (id) => {
        await NoroffAPI.util.handleRequest(NoroffAPI.paths.post(this.user.name, id), 'text')
    },
    create: async ({ title, body, tags, media }) => {
        const data = await NoroffAPI.util.handleRequest(NoroffAPI.paths.posts(this.user.name), {
            method: "POST",
            body: JSON.stringify({ title, body, tags, media }),
          });
          return data
        }
  }

  posts = {
    read: async (page = 1, limit = 12, tag) => {
        const url = new URL(NoroffAPI.paths.posts(this.user.name));
        
        if (tag) {
            url.searchParams.append("tag", tag);
        }

        url.searchParams.append("page", page);
        url.searchParams.append("limit", limit);

        const response = await fetch(url, {
            headers: NoroffAPI.util.setupHeaders(),
        });

        const { data } = await NoroffAPI.util.handleResponse(response);
        return data;
    },
    create: async ({ title, body, tags, media }) => {
        const url = new URL(NoroffAPI.paths.posts(this.user.name), {
          
        });
        const response = await fetch(url, {
            method: "POST",
            headers: NoroffAPI.util.setupHeaders(),
            body: JSON.stringify({ title, body, tags, media })
        })
        const { data } = await NoroffAPI.util.handleResponse(response);
        return data
    }
  }
}
