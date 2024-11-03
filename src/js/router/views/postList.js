import { postList } from "../../api/post/postList";
import { onPostList } from "../../ui/post/postList";
import { authGuard } from "../../utilities/authGuard";

authGuard();
postList();
onPostList()