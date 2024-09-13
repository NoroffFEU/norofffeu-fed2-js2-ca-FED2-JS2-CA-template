import { PostMain } from "@/components/post/PostMain";
import { getId } from "@/js/utilities/getId";

function loadPostPage() {
  console.log("'hola!");
  const mainPost = new PostMain(getId());
  mainPost.init();
}

loadPostPage();
