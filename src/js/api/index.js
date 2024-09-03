import router from "../router";
import { getCurrentUser } from "../utilities/currentUser.js";
import { API_BLOG_USER_POST } from "./constants.js";

export default class NoroffAPI {
  apiBase = "";

  constructor(apiBase="https://v2.api.noroff.dev") {
    this.apiBase = apiBase;
  }

  get getCurrentUser(){
    return getCurrentUser();
  }
  get apiLoginPath() {
    return `${this.apiBase}/auth/login`;
  }

  get apiRegisterPath() {
    return `${this.apiBase}/auth/register`;
  }

  get apiPostPath (){
    return `${this.apiBase}/blog/posts/${this.user.name}`
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
    },
  };

  post = {
    read: async (id) => {
     
      const {token, user} = getCurrentUser ();


      const url = `${this.apiPostPath}/blog/posts/${user.name}/${id}`

    
      const response = await fetch (url,{
          headers:{
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          },
      });
  
      if (response.ok){
          const data = await response.json()
          return data
      }
  
      throw new Error ('Could not create post');
    },
    update: async (id,{title, body, tags, media}) => {
      const {token, user} = getCurrentUser ();

      const response = await fetch (API_BLOG_USER_POST(user.name, id),{
          headers:{
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          },
          method:"put",
          body: JSON.stringify({title, body, tags,media}),
      });
  
      if (response.ok){
          const data = await response.json()
          return data
      }
  
      throw new Error ('Could not update post' + id);
    },
    delete: async (id) => {
      const {token} = getCurrentUser ();

      const response = await fetch (`${this.apiPostPath}/${id}`,{
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.ok){
        const data = await response.json()
        return data
    }

    throw new Error ('Could not delete post' + id);

    },
    create: async ({title, body, tags, media}) => {
      const {token, user} = getCurrentUser ();

      const response = await fetch (this.apiPostPath,{
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({title,body,tags,media})
      })

      if (response.ok){
        const data = await response.json()
        return data
    }

    throw new Error ('Could not create post');
    },
  
  }
}
