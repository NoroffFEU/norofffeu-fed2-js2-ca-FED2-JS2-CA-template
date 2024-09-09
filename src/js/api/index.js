import { API_BASE } from "./constants";
import { headers } from "./headers";

export default class NoroffAPI {
  apiBase = ""
  apiLoginPath = ""
  apiRegisterPath = ""

  constructor(apiBase = API_BASE) {
    this.apiBase = apiBase;
    this.apiLoginPath = apiBase + "/auth/login";
    this.apiRegisterPath = apiBase + "/auth/register"
  }

  auth = {
    login: async ({ email, password }) => {
      const body = JSON.stringify({ email, password });
  
      const response = await fetch(this.apiLoginPath, {
        headers: headers(true),
        method: "POST",
        body,
      });

      const data = await this.util.handleResponse(response, "Could not login this account");
      const { accessToken: token, ...user } = data;
      localStorage.token = token;
      localStorage.user = JSON.stringify(user);
      window.location.href = "/post/feed/";
      return data;
    
      // if(response.ok) {
      //   const { data } = await response.json();
      //   const { accessToken: token, ...user } = data;
      //   localStorage.token = token;
      //   localStorage.user = JSON.stringify(user);
      //   window.location.href = "/post/feed/";
      //   return data;
      // }
      
      // const errorData = await response.json();
      // const errorMessage = errorData.errors[0]?.message || "Could not login with this account";
      // throw new Error(errorMessage);
    },

    register: async ({ name, email, password }) => {
      const body = JSON.stringify({ name, email, password });
  
      const response = await fetch(this.apiRegisterPath, {
        headers: headers(true),
        method: "POST",
        body,
      });

      const data = await this.util.handleResponse(response, "Could not register this account");
      return data;
  
      // if(response.ok) {
      //   const { data } = await response.json();
      //   return data
      // }
  
      // const errorData = await response.json();
      // const errorMessage = errorData.errors[0]?.message || "Could not register this account";
      // throw new Error(errorMessage);
    },
  }

  util = {
    handleResponse: async (response, errorMessage) => {
      if (response.ok) {
        return await response.json();
      }

      const errorData = await response.json();
      const errorDetail = errorData.errors[0]?.message || "Unknown error";

      throw new Error(`${errorMessage}: ${errorDetail}`);
    }
  }

  post = {
    create: async ({ title, body, tags, media }) => {},

    delete: async (id) => {},

    readPost: async (id) => {},

    readPosts: async () => {},

    readPostsByUser: async () => {},

    update: async (id, { title, body, tags, media }) => {},
  }
}