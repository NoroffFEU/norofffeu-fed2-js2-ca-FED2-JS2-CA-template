import router from "@router/index";
import { readPost, readPostsFromFollowing } from "@api/post/read";
import { createPost } from "@api/post/create";
import { deleteComment, deletePost } from "@api/post/delete";
import { read } from "fs";
import { updatePost } from "./js/api/post/update";
import { readProfile, readProfiles } from "@api/profile/read";
import { updateProfile } from "./js/api/profile/update";
import { createComment } from "./js/api/post/create";
import { reactToPost } from "./js/api/post/react";
import { searchPosts } from "./js/api/post/search";
import { readPosts } from "./js/api/post/read";
import { readPostsByUser } from "./js/api/post/read";

await router(window.location.pathname);
