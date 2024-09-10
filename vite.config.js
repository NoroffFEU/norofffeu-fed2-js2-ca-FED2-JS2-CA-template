import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  base: "",
  build: {
    target: "esnext",
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        login: resolve(__dirname, "./auth/login/index.html"),
        auth: resolve(__dirname, "./auth/index.html"),
        register: resolve(__dirname, "./auth/register/index.html"),
        profile: resolve(__dirname, "./profile/index.html"),
        post: resolve(__dirname, "./post/index.html"),
        editPost: resolve(__dirname, "./post/edit/index.html"),
        createPost: resolve(__dirname, "./post/create/index.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@types": resolve(__dirname, "./src/types"),
      "@api": resolve(__dirname, "./src/js/api"),
      "@ui": resolve(__dirname, "./src/js/ui"),
      "@router": resolve(__dirname, "./src/js/router"),
      "@utilities": resolve(__dirname, "./src/js/utilities"),
    },
  },
});
