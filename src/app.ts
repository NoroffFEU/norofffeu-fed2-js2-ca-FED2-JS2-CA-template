import router from "@router/index";
import { readPost } from "@api/post/read";

await router(window.location.pathname);
const id = 108;

readPost(id);
