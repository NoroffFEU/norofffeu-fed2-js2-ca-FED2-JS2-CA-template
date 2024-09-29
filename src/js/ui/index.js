// src/js/ui/index.js

import { login, register, logout } from '../api/auth.js';
import { createPost, readPost, readPosts, deletePost, updatePost } from '../api/post.js';
import { handleFormSubmit } from './form.js'; // Form handling utility function
import { currentUser } from '../utilities/currentUser.js'; 
// Main Application Class
export default class NoroffApp {
  // Initializes the app based on the current path
  static async initialize() {
    const pathname = window.location.pathname;

    switch (pathname) {
      case '/auth/login/index.html':
        this.initLoginPage();
        break;
      case '/auth/register/index.html':
        this.initRegisterPage();
        break;
      case '/post/create/index.html':
        this.initCreatePostPage();
        break;
      case '/post/index.html':
        this.initSinglePostPage();
        break;
      case '/post/edit/index.html':
        this.initUpdatePostPage();
        break;
      case '/post/delete/':
        this.initDeletePostPage();
        break;
      case '/profile/index.html':
        this.initProfilePage();
        break;
      case '/auth/logout/':
        this.initLogoutPage();
        break;
      case '/':
      default:
        this.initHomePage();
    }
  }

  // Initialize Login Page
  static initLoginPage() {
    const form = document.forms.login;
    if (!form) return; // Ensure the login form is present

    form.addEventListener('submit', async (event) => {
      const data = handleFormSubmit(event); // Form handling logic
      try {
        await login(data);
        window.location.href = '/profile/index.html';
      } catch (error) {
        alert(error.message);
        console.error('Login Error:', error);
      }
    });
  }

  // Initialize Register Page
  static initRegisterPage() {
    const form = document.forms.register;
    if (!form) return; // Ensure the register form is present

    form.addEventListener('submit', async (event) => {
      const data = handleFormSubmit(event); // Form handling logic
      try {
        await register(data);
        window.location.href = '/auth/login/index.html';
      } catch (error) {
        alert(error.message);
        console.error('Registration Error:', error);
      }
    });
  }

  // Initialize Logout Page
  static initLogoutPage() {
    logout(); // Logout function from the API
    window.location.href = '/index.html'; // Redirect to login page after logout
  }

  // Initialize Create Post Page
  static initCreatePostPage() {
    const form = document.forms.createPost;
    if (!form) return; // Ensure the create post form is present

    form.addEventListener('submit', async (event) => {
      const data = handleFormSubmit(event);
      try {
        const post = await createPost(data); // Create the post using API
        window.location.href = `/post/index.html?id=${newPost.id}`; // Redirect to the newly created post

      } catch (error) {
        alert(error.message);
        console.error('Post Creation Error:', error);
      }
    });
  }

  // Initialize Update Post Page
  static async initUpdatePostPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const form = document.forms.updatePost;
    if (!form) return; // Ensure the update post form is present

    form.addEventListener('submit', async (event) => {
      const data = handleFormSubmit(event);
      try {
        await updatePost(id, data); // Update the post using API
        window.location.href = `/post/index.html?id=${newPost.id}`; // Redirect to the updated post's page
      } catch (error) {
        alert(error.message);
        console.error('Post Update Error:', error);
      }
    });
  }

  // Initialize Delete Post Page
  static async initDeletePostPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    try {
      await deletePost(id); // Delete the post using API
      window.location.href = '/index.html'; // Redirect to the home page
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  }

  // Initialize Profile Page
  static async initProfilePage() {
    // Fetch and display user profile data
    try {
      const user = await currentUser(); // Fetch the current user using API
      // Populate the DOM with user profile data
      document.getElementById('username').textContent = user.username || "No username";
      document.getElementById('email').textContent = user.email || "No email";
    } catch (error) {
      console.error('Failed to load user profile:', error);
    }
  }

  // Initialize Index Page (

  // Initialize Single Post Page
  static async initSinglePostPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    try {
      const post = await readPost(id); // Read the post using API
      // Populate the DOM with post data
      document.getElementById('title').textContent = post.title || "Untitled";
      document.getElementById('body').textContent = post.body || "No content";
      document.getElementById('tags').textContent = post.tags ? post.tags.join(', ') : "No tags";
    } catch (error) {
      console.error('Failed to load post:', error);
    }
  }

  // Initialize Home Page
  static async initHomePage() {
    try {
      const posts = await readPosts(12, 1); // Get the first 12 posts
      const listElement = document.getElementById('postList');
      if (!listElement) {
        console.error("postList element not found in the DOM");
        return;
      }
      listElement.innerHTML = ''; // Clear existing content before adding new posts

      posts.forEach((post) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="/post/index.html?id=${post.id}">${post.title}</a>`;
        listElement.appendChild(listItem);
      });
    } catch (error) {
      console.error('Failed to load posts:', error);
    }
  }
}

// Initialize the app once the DOM is ready
document.addEventListener('DOMContentLoaded', () => NoroffApp.initialize());
