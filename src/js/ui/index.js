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
        await this.views.login();
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

      const params = new URLSearchParams(window.location.search);
      const page = params.get('page') || localStorage.getItem("page") || 1;
      this.events.post.displayPosts(Number(page));
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
      this.events.profile.displayProfilePage();
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
      localStorage.page = null;
    
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

            const isConfirmed = window.confirm("Are you sure you want to delete this post?");
            if (isConfirmed) {
              await api.post.delete(postId)
            }
          } catch (error) {
            alert(error.message);
          }
        })
      },

      displayPosts: async (page = 1) => {
        try {
          const posts = await api.posts.getPosts(12, page);
          const { data, meta } = posts;
          const { currentPage, pageCount } = meta;
          const postFeed = document.querySelector('.feed');
          postFeed.innerHTML = '';
          data.forEach(post => {
            const postHTML = generateFeedHTML(post);
            postFeed.appendChild(postHTML);
          })
          const newUrl = `${window.location.pathname}?page=${page}`;
          window.history.replaceState({}, '', newUrl);
          this.pagination.feedPagination(currentPage, pageCount);
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });

          const article = document.querySelectorAll(".post-container");
          article.forEach(post => {
            post.addEventListener("click", () => {
              const params = new URLSearchParams(window.location.search);
              const pageNumber = params.get('page');
              localStorage.setItem("page", pageNumber);
            })
          });

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

          const backProfileButton = document.querySelector(".back-to-profile-page");
          backProfileButton.href = `/profile/?name=${postAuthor}`;
          backProfileButton.textContent = `${postAuthor}'s page`;
          const backIcon = document.createElement("i");
          backIcon.classList.add("fa-solid", "fa-chevron-left", "back-to-profile-icon");
          backProfileButton.insertBefore(backIcon, backProfileButton.firstChild);

          const form = document.forms["comment"];
          form.addEventListener("submit", this.events.post.comment);

          const backButton = document.querySelector(".back-link-on-single-page");
          const previousPage = localStorage.getItem("page");
          backButton.href = `/post/feed/?page=${previousPage}`;

          this.events.post.deleteComment();
          this.pagination.singlePostPagination();
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

      comment: async (event) => {
        const data = NoroffApp.form.handleSubmit(event);
        const comment = data.comment;

        if (!comment || comment.trim() === "") {
          alert("Comment cannot be empty.");
          return;
        }
        
        try {
          const params = new URLSearchParams(window.location.search);
          const postId = params.get('id');
          await api.post.comment(postId, { body: comment });
          this.events.post.displaySinglePost();
        } catch (error) {
          alert(error.message);
        }
      },

      deleteComment: () => {
        const commentDeleteButtons = document.querySelectorAll(".comment-delete-button");
        commentDeleteButtons.forEach(button => {
          button.addEventListener("click", async (event) => {
            try {
              const params = new URLSearchParams(window.location.search);
              const postId = params.get('id');
              const commentItem = event.target.closest(".comment-item");
              const commentID = commentItem.id;
              const isConfirmed = window.confirm("Are you sure you want to delete this comment?");
              if(isConfirmed) {
                await api.post.deleteComment(postId, commentID);
                commentItem.remove();
              }
            } catch (error) {
              alert(error.message);
            }
          })
        })
      }
    },

    profile: {
      displayProfilePage: async (page = 1) => {
        const params = new URLSearchParams(window.location.search);
        const name = params.get('name');

        try {
          const userPostsData = await api.profile.readUsersPosts(name, 12, page);
          const userProfile = await api.profile.readProfile(name);
          const userData = userProfile.data
          const postData = userPostsData.data;
          const userAvatar = document.querySelector(".avatar");
          userAvatar.src = userData.avatar.url;
          const userName = document.querySelector(".username");
          userName.textContent = userData.name;
          document.querySelector(".followers").textContent = userData._count.followers;
          document.querySelector(".following").textContent = userData._count.following;
          document.querySelector(".posts").textContent = userData._count.posts;
          const profileHeader = document.querySelector(".profile-header");
          const bannerURL = userData.banner.url;
          profileHeader.style.backgroundImage = `url(${bannerURL})`;

          const updateButton = document.querySelector(".update-button");
          if(name === NoroffAPI.user) {
            updateButton.style.display = "block";
          } else {
            updateButton.style.display = "none";
          }

          const postFeed = document.querySelector('.feed');
          postFeed.innerHTML = '';
          postData.forEach(post => {
            const postHTML = generateFeedHTML(post);
            postFeed.appendChild(postHTML);
          });
        } catch(error) {
          alert(error.message);
        }
      }
    }
  }

  pagination = {
    feedPagination: async (currentPage, pageCount) => {
      const paginationContainer = document.querySelector('.feed-pagination');
      paginationContainer.innerHTML = '';

      const createButton = (text, page) => {
        const button = document.createElement('button');
        button.textContent = text;
        button.dataset.page = page;
        button.className = 'pagination-button';
        if(page === currentPage) {
          button.classList.add("current-page");
        }
        button.addEventListener('click', () => {
          this.events.post.displayPosts(page);
        });
        return button;
      };

      const createEllipsis = () => {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = "...";
        return ellipsis;
      }
      
      const previousButton = document.createElement('button')
      const previousButtonIcon = document.createElement("i");
      previousButtonIcon.classList.add("fa-solid", "fa-chevron-left");
      previousButton.appendChild(previousButtonIcon);
      paginationContainer.appendChild(previousButton);
      previousButton.addEventListener("click", () => {
        if (currentPage > 1) {
          this.events.post.displayPosts(currentPage -1);
        }
      })

      if (currentPage === 1) {
        previousButton.disabled = true;
        previousButton.style.cursor = "not-allowed";
      } else {
        previousButton.disabled = false;
      }
      
      if (currentPage < 4) {
        for (let i = 1; i < 4; i++) {
          const pageButton = createButton(i, i);
          paginationContainer.appendChild(pageButton);
        }
        paginationContainer.appendChild(createEllipsis());
        const lastPageButton = createButton(pageCount, pageCount);
        paginationContainer.appendChild(lastPageButton);
      }
      
      if (currentPage >= 4 && currentPage <= pageCount - 3) {
        const firstPageButton = createButton(1, 1);
        paginationContainer.appendChild(firstPageButton);
        
        paginationContainer.appendChild(createEllipsis());

        const startPage = Math.max(3, currentPage -2);
        const endPage = Math.min(pageCount -2, currentPage +2);
        for (let i = startPage; i <= endPage; i++) {
          const pageButton = createButton(i, i);
          paginationContainer.appendChild(pageButton);
        }
        paginationContainer.appendChild(createEllipsis());
        const lastPageButton = createButton(pageCount, pageCount);
        paginationContainer.appendChild(lastPageButton);
      }

      if (currentPage > pageCount -3) {
        const firstPageButton = createButton(1,1);
        paginationContainer.appendChild(firstPageButton)
        paginationContainer.appendChild(createEllipsis());
        for(let i = pageCount -2; i <= pageCount; i++) {
          const pageButton = createButton(i, i);
          paginationContainer.appendChild(pageButton);
        }
      }

      if (pageCount <= 7) {
        for (let i = 1; i < 8; i++) {
          const pageButton = createButton(i, i);
          paginationContainer.appendChild(pageButton);
        }
      }

      const nextButton = document.createElement('button');
      const nextButtonIcon = document.createElement("i");
      nextButtonIcon.classList.add("fa-solid", "fa-chevron-right");
      nextButton.appendChild(nextButtonIcon);
      paginationContainer.appendChild(nextButton);
      nextButton.addEventListener("click", () => {
        if (currentPage < pageCount) {
          this.events.post.displayPosts(currentPage +1);
        }
      })

      if (currentPage === pageCount) {
        nextButton.disabled = true;
        nextButton.style.cursor = "not-allowed";
      } else {
        nextButton.disabled = false;
      }
    },

    singlePostPagination: async () => {
      let postData = await api.posts.getAllPosts();
      let { data, meta } = postData;
      const totalCount = meta.totalCount;
      let currentPage = 1;

      const params = new URLSearchParams(window.location.search);
      const postId = Number(params.get('id'));

      let currentIndex = data.findIndex(post => post.id === postId);

      while (currentIndex === -1 && currentPage * 100 < totalCount) {
        currentPage++;
        let newPostData = await api.posts.getPosts(100, currentPage);
        data = data.concat(newPostData.data);
        currentIndex = data.findIndex(post => post.id === postId);
      }
      
      const previousButton = document.getElementById("previous-post");
      if (previousButton) {
        if (currentIndex > 0) {
          const previousPostId = data[currentIndex -1].id;
          previousButton.addEventListener("click", () => {
            window.location.href = `/post/?id=${previousPostId}`;
          })
        } else {
          previousButton.disabled = true;
          previousButton.style.cursor = "not-allowed";
        }
      }

      const nextButton = document.getElementById("next-post");
      if (nextButton) {
        if (currentIndex < data.length - 1) {
          const nextPostId = data[currentIndex +1]?.id;
          nextButton.addEventListener("click", () => {
            if(nextPostId) {
              window.location.href = `/post/?id=${nextPostId}`;
            }
          })
        } else if (currentPage * 100 < totalCount) {
          currentPage++;
          try {
            let newPostData = await api.posts.getPosts(100, currentPage);
            data = data.concat(newPostData.data);
            currentIndex = data.findIndex(post => post.id === postId);
            const nextPostId = data[currentIndex +1]?.id;
            nextButton.addEventListener("click", () => {
              if(nextPostId) {
                window.location.href = `/post/?id=${nextPostId}`;
              } else {
                nextButton.disabled = true;
                nextButton.style.cursor = "not-allowed";
              }
            })
          } catch (error) {
            alert(error.message)
            nextButton.disabled = true;
            nextButton.style.cursor = "not-allowed";
          }
        } else {
          nextButton.disabled = true;
          nextButton.style.cursor = "not-allowed";
        }
      }
    }
  }
}