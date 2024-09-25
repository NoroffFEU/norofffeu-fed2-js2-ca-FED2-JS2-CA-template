import NoroffAPI from "../api/index.js";


export default class NoroffApp extends NoroffAPI {

    constructor() {
        super();
        this.router();
    }

    async router(href = window.location.href) {
        const url = new URLSearchParams(href);
        const params = Object.fromEntries(url.URLSearchParams.entries());
        const pathname = url.pathname

        switch (pathname) {
            case "/":
            case "/index.html":
              await this.views.home();
              break;
            case "/auth/":
              await this.views.auth();
              break;
            case "/auth/login.html/":
              await this.views.login();
              break;
            case "/auth/register.html/":
              await this.views.register();
              break;
            case "/post/":
            case "/post/index.html/":
              await this.views.post(params.id);
              break;
            case "/post/edit.html/":
              await this.views.postEdit();
              break;
            case "/post/create.html/":
              await this.views.postCreate();
              break;
            case "/posts/":
            case "/posts/index.html":
              await this.views.posts(params);
              break;
            case "/profile/":
            case "/profile/index.html":
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
      const data = Object.fromEntries(formData.entries());
    },
  };

  static tags = {
    split(tagString) {
      let tags = tagString.split(",").map((tag) => tag.trim());
      return tags;
    },
    join(tagArray) {
      return tagArray.join(", ");
    },
  };

  views = {
    home: async () => {
      document.querySelectorAll("[data-auth=logout]").forEach((button) => {
        button.addEventListener("click", () => {
          this.auth.logout();
        });
      });
    },
    login: async () => {
      document.forms.login.addeventListener("submit", this.events.login);
    },
    register: async () => {
      document.forms.register.addeventListener("submit", this.events.register);
    },
    post: async (id) => {
        const post  = await this.post.read(id);
        document.querySelector('input#id').value = id;
        document.querySelector('#title').innerText = post.title;
        document.querySelector('#body').innerText = post.body;
        document.querySelector('#tags').innerText = NoroffApp.tags.join(', ');
        document.querySelector('a.update').href = `/post/edit/?id=${id}`;
        document.forms.deletePost.addEventListener("submit", this.events.post.delete);
    },
    async postUpdate(id) {
      try {
        const post = await this.post.read(id);
        document.querySelector("#title").value = post.title;
        document.querySelector("#body").value = post.body;
        document.querySelector("#tags").value = post.tags.join(", ");

        document.forms.updatePost.addeventListener(
          "submit",
          this.events.post.update
        );
      } catch (error) {
        alert(error.message);
        window.location.href = "/";
      }
    },
    postCreate: async () => {
        document.forms.createPost.addeventListener(
          "submit",
          this.events.post.create
        );
    },
    posts: async (params) => {
        const posts = await this.posts.read(params.tag, params.limit, params.page);
        const ul = document.querySelector('ul');

        const listItems = posts.map(post => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `/post/?id=${post.id}`;
            a.textContent = post.title;
            li.appendChild(a);
            return li;
        })

        ul.append(...listItems);
      }
    }
  }
  
  events = {
    login: async (event) => {
      const data = NoroffApp.form.handleSubmit(event);

      try {
        await this.auth.login(data);
        window.location.href = "/";
      } catch (error) {
        alert(error);
      }
    },
    register: async (event) => {
      const data = NoroffApp.form.handleSubmit(event);

      try {
        await this.auth.register(data);
        window.location.href = "/auth/login.html";
      } catch (error) {
        alert(error);
      }
    },
    post: {
      create: async (event) => {
        const data = NoroffApp.form.handleSubmit(event);

        try {
          const post = await this.post.create(data);
          window.location.href = `/post/?id=$(post.id)`;
        } catch (error) {
          alert(error);
        }
      },
      update: async () => {
        const id = currentPostId;

        try {
          const post = await this.post.read(id);

          document.querySelector("#title").value = post.title;
          document.querySelector("#body").value = post.body;
          document.querySelector("#tags").value = post.tags.join(", ");

          document.forms.updatePost.addeventListener(
            "submit",
            async (event) => {
              const data = NoroffApp.form.handleSubmit(event);

              data.tags = data.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean);

              try {
                await this.post.update(id, data);
                window.location.href = `/post/?id=${id}`;
              } catch (error) {
                console.error(error);
                alert("Failed to update post");
              }
            }
          );
        } catch (error) {
          alert(error);
        }
      },
      delete: async (event) => {
        const { id } = NoroffApp.form.handleSubmit(event);

        try {
          await this.post.delete(id);
          window.location.href = "/";
        } catch (e) {
          console.log(e);
          alert("Failed to delete post");
        }
      },

      view: async (id) => {
        try {
          const post = await this.post.read(id);

          document.querySelector("input#id").value = id;
          document.querySelector("#title").textContent = post.title;
          document.querySelector("#body").textContent = post.body;
          document.querySelector("#tags").textContent = post.tags.join(", ");
          document.querySelector("a.update").href = post.id;

          document.forms.deletePost.addEventListener(
            "submit",
            this.events.post.delete
          );
        } catch (error) {
          alert(error.message);
          window.location.href = "/";
        }
      },
    },
};

