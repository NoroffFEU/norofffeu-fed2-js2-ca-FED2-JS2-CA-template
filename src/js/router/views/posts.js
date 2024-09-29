import { onReadPosts } from "../../ui/home";
import { authGuard } from "../../utilities/authGuard";
import { readPostsByUser } from "../../api/post/read";
import { getLoggedInUser } from "../../utilities/getLoggedInUser.js";

authGuard();

try {
    const user = getLoggedInUser();
    const posts = await readPostsByUser(user.name);
    onReadPosts(posts);
} catch (error) {
    console.error("Failed to fill posts:", error);
    alert(error.message);
}

