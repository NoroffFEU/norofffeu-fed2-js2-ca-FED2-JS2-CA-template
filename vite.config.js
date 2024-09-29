// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  base: "",
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: "./index.html",
        login: "./auth/login/index.html",
        auth:  "./auth/index.html",
        register: "./auth/register/index.html",
        profile: "./profile/index.html",
        post: "./post/index.html",
        editPost: "./post/edit/index.html",
        createPost: "./post/create/index.html",
      },
    },
  },
});
