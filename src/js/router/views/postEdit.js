import { authGuard } from "../../utilities/authGuard";
import { onUpdatePost } from "../../ui/post/update";

authGuard();

onUpdatePost();