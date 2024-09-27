import { onReadPosts } from "../../ui/home";
import { authGuard } from "../../utilities/authGuard";

authGuard();

onReadPosts();

