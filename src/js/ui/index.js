import NoroffAPI from "../api";
import api from "../api/instance.js";
import { authGuard } from "../utilities/authGuard.js";
import { generateFeedHTML } from "./post/generateFeedHTML.js";
import { generateSinglePostHTML } from "./post/generateSinglePostHTML.js";

export default class NoroffApp extends NoroffAPI {

  constructor() {
    super()
    this.router()
  }

  async router(pathname = window.location.pathname) {
    switch (pathname) {
      case "/":
        await this.views.home()
        break;
      case "/auth/login/":
        await this.views.login();
        break;
      case "/auth/register/":
        await this.views.register();
        break;
      case "/post/":
        await this.views.post();
        break;
      case "/post/edit/":
        await this.views.postEdit();
        break;
      case "/post/create/":
        await this.views.postCreate();
        break;
      case "/post/feed/":
      await this.views.feed();
      break;
      case "/profile/":
        await this.views.profile();
        break;
      default:
        await this.views.notFound();
    }
  }

  static form = {
    handleSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      return Object.fromEntries(formData.entries());
    }
  }

  views = {
    home: async () => {},

    register: async () => {
      const form = document.forms["register"];
      form.addEventListener("submit", this.events.register);
    },

    login: async () => {
      const form = document.forms["login"];
      form.addEventListener("submit", this.events.login);
    },

    feed: async () => {
      const logoutButton = document.querySelector(".logout-button");
      logoutButton.addEventListener("click", this.events.logout);
      this.events.post.displayPosts();
    },

    postCreate: async () => {
      authGuard();
      const logoutButton = document.querySelector(".logout-button");
      logoutButton.addEventListener("click", this.events.logout);
      const form = document.forms["createPost"];
      form.addEventListener("submit", this.events.post.create);
    },

    postEdit: async () => {
      authGuard();
      const logoutButton = document.querySelector(".logout-button");
      logoutButton.addEventListener("click", this.events.logout);
      this.events.post.update();
      this.events.post.delete();
    },

    post: async () => {
      const logoutButton = document.querySelector(".logout-button");
      logoutButton.addEventListener("click", this.events.logout);
      this.events.post.displaySinglePost();
    },

    profile: async () => {
      authGuard();
      const logoutButton = document.querySelector(".logout-button");
      logoutButton.addEventListener("click", this.events.logout);
    },

    notFound: async () => {
      alert("Page cannot be found in /src/views");
    }
  }

  events = {
    login: async (event) => {
      const data = NoroffApp.form.handleSubmit(event);

      try {
        await api.auth.login(data)
      } catch(error) {
        alert(error.message);
      }
    },

    register: async (event) => {
      const data = NoroffApp.form.handleSubmit(event);
      const { name, email} = data;
      try {
        await api.auth.register(data);
        alert(`Registration successful!\nUsername: ${name}\nEmail: ${email}`);
        console.log(data);
        window.location.href = "/auth/login/";
      } catch(error) {
        alert(`${error.message}.\nPlease try again.`);
      }
    },

    logout: (event) => {
      event.preventDefault();

      NoroffAPI.user = null;
      NoroffAPI.token = null;
    
      alert("You have successfully logged out.");
      window.location.href = "/";
    },

    post: {
      create: async (event) => {
        const data = NoroffApp.form.handleSubmit(event);
        const media = {
          url: data['media[url]'],
          alt: data['media[alt]']
        };
        const { title, body, tags } = data;
        const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : [];

        try {
          await api.post.create({ 
            title,
            body,
            tags: tagsArray,
            media
          })
        } catch(error) {
          alert(error.message);
        }
      },

      delete: () => {
        const deleteButton = document.querySelector(".delete-button");
        deleteButton.addEventListener("click", async () => {
          try {
            const params = new URLSearchParams(window.location.search);
            const postId = params.get('id');
            await api.post.delete(postId)
          } catch (error) {
            alert(error.message);
          }
        })
      },

      displayPosts: async () => {
        try {
          const posts = await api.posts.getPosts();
          const postData = posts.data;
          const postFeed = document.querySelector('.feed');
          postFeed.innerHTML = '';
          postData.forEach(post => {
            const postHTML = generateFeedHTML(post);
            postFeed.appendChild(postHTML);
          })
        } catch(error) {
          alert(error.message)
        }
      },

      displaySinglePost: async () => {
        try {
          const params = new URLSearchParams(window.location.search);
          const postId = params.get('id');
          const post = await api.post.readPost(postId);
          const postData = post.data;
          const postAuthor = postData.author.name;
          
          const editButton = document.querySelector(".edit-button");
          editButton.dataset.id = postId;
          if(postAuthor === NoroffAPI.user) {
            editButton.style.display = "block";
          } else {
            editButton.style.display = "none";
          }
          editButton.addEventListener("click", () => {
            window.location.href = `/post/edit/?id=${postId}`;
          })

          const singlePostFeed = document.querySelector('.single-post');
          singlePostFeed.innerHTML = "";
          const singlePostHTML = generateSinglePostHTML(postData);
          singlePostFeed.appendChild(singlePostHTML);
        } catch(error) {
          alert(error.message)
        }
      },

      update: async () => {
        try {
          const params = new URLSearchParams(window.location.search);
          const postId = params.get('id');
          const post = await api.post.readPost(postId);
          const { data } = post;
          const { title, body, tags, media } = data;

          document.getElementById('title').value = title;
          document.getElementById('content').value = body;
          document.getElementById('tags').value = tags.join(',');
          document.getElementById('img-url').value = media.url;
          document.getElementById('img-alt').value = media.alt;

          document.forms["editPost"].addEventListener("submit", async (event) => {
            const updatedData = NoroffApp.form.handleSubmit(event);
            updatedData.tags = updatedData.tags.split(',').map(tag => tag.trim());
            updatedData.media = {
              url: updatedData['media[url]'],
              alt: updatedData['media[alt]']
            };
            await api.post.update(postId, updatedData);
          });
      
        } catch (error) {
          alert(error.message);
        }
      },
    }
  }
}