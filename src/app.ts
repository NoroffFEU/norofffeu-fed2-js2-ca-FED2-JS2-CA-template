import router from "@router/index";
import { readPost } from "@api/post/read";
import { createPost } from "./js/api/post/create";
import { deletePost } from "./js/api/post/delete";

await router(window.location.pathname);
