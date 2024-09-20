import { PostMain } from "@/components/post/PostMain";
import { renderProfile } from "@/js/ui/profile/renderUserProfile";
import { getId } from "@/js/utilities/getId";

function loadPostPage() {
  renderProfile();
  console.log("'hola!!!");
  const mainPost = new PostMain(getId());
  mainPost.init();
}

loadPostPage();
