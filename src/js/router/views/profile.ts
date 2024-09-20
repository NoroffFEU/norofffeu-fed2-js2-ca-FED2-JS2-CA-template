import { renderProfile } from "@/js/ui/profile/renderUserProfile";
import { authGuard } from "../../utilities/authGuard";

authGuard();
renderProfile();
