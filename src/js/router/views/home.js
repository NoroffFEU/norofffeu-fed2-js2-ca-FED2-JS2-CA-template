import { displayPosts } from "../../api/post/postsStructure";
import { readPosts } from "../../api/post/read";
import { setLogoutListener } from "../../ui/global/logout";
import { authGuard } from "../../utilities/authGuard";

async function runPage() {
    const posts = await readPosts()
    displayPosts(posts)
}

runPage();

setLogoutListener();

authGuard();