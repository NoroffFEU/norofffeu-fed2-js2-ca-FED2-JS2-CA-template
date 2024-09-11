import router from "@router/index";
import { readPost } from "@api/post/read";
import { createPost } from "@api/post/create";
import { deletePost } from "@api/post/delete";
import { read } from "fs";
import { updatePost } from "./js/api/post/update";
import { readProfile, readProfiles } from "@api/profile/read";
import { updateProfile } from "./js/api/profile/update";

await router(window.location.pathname);
