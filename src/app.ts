import router from "@router/index";
import { readPost } from "@api/post/read";
import { createPost } from "@api/post/create";
import { deletePost } from "@api/post/delete";
import { read } from "fs";
import { updatePost } from "./js/api/post/update";

await router(window.location.pathname);

readPost(146);
